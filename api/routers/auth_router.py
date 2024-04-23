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

from queries.matches import LikesIn, LikesOut, LikesRepository

from typing import Dict, List


# Note we are using a prefix here,
# This saves us typing in all the routes below
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
    # Hash the password the user sent us
    hashed_password = hash_password(new_user.password)

    # Create the user in the database
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

    # Generate a JWT token
    token = generate_jwt(user)

    # Convert the UserWithPW to a UserOut
    user_out = UserResponse(**user.model_dump())

    # Secure cookies only if running on something besides localhost
    secure = request.headers.get("origin") == "localhost"

    # Set a cookie with the token in it
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

    # Try to get the user from the database
    user = queries.get_by_username(user_request.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    # Verify the user's password
    if not verify_password(user_request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    # Generate a JWT token
    token = generate_jwt(user)

    # Secure cookies only if running on something besides localhost
    secure = request.headers.get("origin") == "localhost"

    # Set a cookie with the token in it
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )

    # Convert the UserWithPW to a UserOut
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
) -> UserResponse:
    """
    This function returns the user if the user is logged in.

    The `try_get_jwt_user_data` function tries to get the user and validate
    the JWT

    If the user isn't logged in this returns a 404

    This can be used in your frontend to determine if a user
    is logged in or not
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    return user


@router.delete("/signout")
async def signout(
    request: Request,
    response: Response,
):
    """
    Signs the user out by deleting their JWT Cookie
    """
    # Secure cookies only if running on something besides localhost
    secure = request.headers.get("origin") == "localhost"

    # Delete the cookie
    response.delete_cookie(
        key="fast_api_token", httponly=True, samesite="lax", secure=secure
    )

    # There's no need to return anything in the response.
    # All that has to happen is the cookie header must come back
    # Which causes the browser to delete the cookie
    return "Signed out successfully"


@router.get("api/users")
async def get_all_users(
    queries: UserQueries = Depends(),
) -> list[UserGender]:
    """
    Get all users
    """
    users = queries.get_all()
    return [UserGender(**user.model_dump()) for user in users]


@router.get("api/users/gender")
def filter_by_gender(
    gender : int,
    min_age: int,
    max_age: int,
    queries: UserQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> list[UserGender]:
    """
    Gets users by gender if a user is authenticated
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )
    get_all_users = queries.get_all()

    return [
        username
        for username in get_all_users
        if username.gender == gender and username.id != user.id and min_age <= username.age <= max_age
    ]


# if where adding the user2 to the likes table of user that is authenticated its a post request


@router.post("/likes")
def create_a_like(
    likes: LikesIn,
    queries: LikesRepository  = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> LikesOut:
    """
    Create a like
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )
    likes.logged_in_user = user.id
    likes = queries.create_a_like(
        likes.logged_in_user,
        likes.liked_by_user,
        likes.status,
    )
    return LikesOut(**likes.model_dump())


@router.get("/likes/all")
def get_all_likes(
    queries: LikesRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> Dict[str, List[LikesOut]]:
    """
    Get all likes
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )

    likes = queries.get_all_likes()
    return {"likes": [LikesOut(**like.model_dump()) for like in likes
            if like.logged_in_user == user.id]}

# update the status of the like without the user having to like the user again
@router.put("/likes/{id}")
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
        
    return LikesOut(**likes.model_dump())





























# def view_all_likes(
#         likes: LikesOut,
#         queries: LikesRepository = Depends(),
#         user: UserResponse = Depends(try_get_jwt_user_data),
#         ) -> LikesOut:

#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
#         )
#     likes.logged_in_user = user.id
#     likes = queries.get_all_likes()

#     return [like.liked_by_user for like in likes]


    # second column of the table, return [ user for user in likes.liked_by_user]
