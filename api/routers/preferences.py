from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)

from models.users import (
    UserResponse
)

from utils.authentication import (
    try_get_jwt_user_data
)

from queries.preferences import (
    PreferencesRepository,
    PreferencesIn,
    PreferencesOut,
)

from typing import Dict, List


router = APIRouter(tags=["Preferences"], prefix="/api")

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

@router.put("/preferences")
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