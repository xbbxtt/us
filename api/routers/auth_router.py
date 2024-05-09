"""
User Authentication API Router
"""

from fastapi import (
    Depends,
    Request,
    Response,
    HTTPException,
    status,
    APIRouter,
)
from queries.user_queries import (
    UserQueries,
)
from queries.preferences import (
    PreferencesRepository,
    PreferencesIn,
    PreferencesOut,
)

from utils.exceptions import UserDatabaseException
from models.users import (
    UserRequest,
    UserResponse,
    UserSignInRequest,
    UserGender,
)

from utils.authentication import (
    try_get_jwt_user_data,
    hash_password,
    generate_jwt,
    verify_password,
)

from queries.matches import (
    LikesIn,
    LikesOut,
    LikesRepository,
    MatchOut,
    GenderRepository,
    GenderOut,
)

from typing import Dict, List


router = APIRouter(tags=["Authentication"], prefix="/api/auth")


@router.post("/signup")
async def signup(
    new_user: UserRequest,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserResponse:
    """
    Creates a new user when someone submits the signup form
    """

    hashed_password = hash_password(new_user.password)

    try:
        user = queries.create_user(
            new_user.username,
            hashed_password,
            first_name=new_user.first_name,
            last_name=new_user.last_name,
            location=new_user.location,
            gender=new_user.gender,
            age=new_user.age,
            description=new_user.description,
            picture_url=new_user.picture_url,
        )
    except UserDatabaseException as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    token = generate_jwt(user)

    user_out = UserResponse(**user.model_dump())

    secure = request.headers.get("origin") == "localhost"

    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )
    return user_out


@router.post("/signin")
async def signin(
    user_request: UserSignInRequest,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserResponse:
    """
    Signs the user in when they use the Sign In form
    """

    user = queries.get_by_username(user_request.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    if not verify_password(user_request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    token = generate_jwt(user)

    secure = request.headers.get("origin") == "localhost"

    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )

    return UserResponse(
        id=user.id,
        username=user.username,
        password=user.password,
        first_name=user.first_name,
        last_name=user.last_name,
        location=user.location,
        gender=user.gender,
        age=user.age,
        description=user.description,
        picture_url=user.picture_url,
    )


@router.get("/authenticate")
async def authenticate(
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> UserResponse | None:
    """
    This function returns the user if the user is logged in.

    The `try_get_jwt_user_data` function tries to get the user and validate
    the JWT

    If the user isn't logged in this returns a 404

    This can be used in your frontend to determine if a user
    is logged in or not
    """

    return user


@router.delete("/signout")
async def signout(
    request: Request,
    response: Response,
):
    """
    Signs the user out by deleting their JWT Cookie
    """

    secure = request.headers.get("origin") == "localhost"

    response.delete_cookie(
        key="fast_api_token", httponly=True, samesite="lax", secure=secure
    )

    return "Signed out successfully"


@router.get("/users")
async def get_all_users(
    queries: UserQueries = Depends(),
) -> list[UserGender]:
    """
    Get all users
    """
    users = queries.get_all()
    return [UserGender(**user.model_dump()) for user in users]


@router.put("/likes/<int:id>")
def update_like_status(
    id: int,
    likes: LikesIn,
    queries: LikesRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> LikesOut:
    """
    Update the status of a like
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )
    likes.logged_in_user = user.id
    likes = queries.update_like_status(
        id,
        likes.status,
    )
    if likes.status:
        queries.create_a_match(likes.logged_in_user, likes.liked_by_user)
        queries.delete_a_like(likes.id)
    else:
        queries.delete_a_like(likes.id)

    return LikesOut(**likes.model_dump())


@router.get("/matches")
def get_user_matches(
    queries: LikesRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> Dict[str, List[MatchOut]]:
    """
    Get all matches
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )

    matches = queries.get_all_matches(user.id)
    return {
        "matches": [
            MatchOut(**match.model_dump())
            for match in matches
            if match.logged_in_user == user.id
            or match.liked_by_user == user.id
        ]
    }


@router.get("/preferences")
def filter_by_preferences(
    preferences: PreferencesRepository = Depends(),
    queries: UserQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> list[UserGender]:
    """
    Get all users
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )
    get_all_users = queries.get_all()
    get_all_pref = preferences.get_all_preferences()
    gender = 0
    min_age = 0
    max_age = 0
    for pref in get_all_pref:
        if pref.user1_id == user.id:
            gender = pref.gender_id
            min_age = pref.min_age
            max_age = pref.max_age

    if gender == 4:
        return [
            username
            for username in get_all_users
            if username.id != user.id and min_age <= username.age <= max_age
        ]

    return [
        username
        for username in get_all_users
        if username.gender == gender
        and username.id != user.id
        and min_age <= username.age <= max_age
    ]
