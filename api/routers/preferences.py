from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)

from models.users import UserResponse

from utils.authentication import try_get_jwt_user_data

from queries.preferences import PreferencesRepository
from models.matches import PreferencesIn, PreferencesOut
from models.users import UserGender
from queries.user_queries import UserQueries

from typing import List


router = APIRouter(tags=["Preferences"], prefix="/api")


@router.get("/filtered-preferences")
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


@router.post("/preferences")
def create_a_preference(
    preferences: PreferencesIn,
    queries: PreferencesRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> PreferencesOut:
    """
    Create a preference
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )
    preferences.user1_id = user.id
    new_preference = queries.create_a_preference(
        preferences.user1_id,
        preferences.min_age,
        preferences.max_age,
        preferences.gender_id,
    )
    return PreferencesOut(**new_preference.model_dump())


@router.put("/preferences/<int:id>")
def update_a_preference(
    preferences: PreferencesIn,
    queries: PreferencesRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> PreferencesOut:
    """
    Update a preference
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )
    preferences.user1_id = user.id
    updated_preference = queries.update_a_preference(
        preferences.user1_id,
        preferences.min_age,
        preferences.max_age,
        preferences.gender_id,
    )

    return PreferencesOut(**updated_preference.model_dump())


@router.get("/preferences")
def get_all_preferences(
    queries: PreferencesRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> List[PreferencesOut]:
    """
    Get all preferences
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )
    preferences = queries.get_all_preferences()
    return [preference.model_dump() for preference in preferences]
