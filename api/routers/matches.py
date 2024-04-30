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

from queries.matches import LikesIn, LikesOut, LikesRepository, MatchOut

from typing import Dict, List


@router.get("user/matches")
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
    return {"matches": [MatchOut(**match.model_dump()) for match in matches
            if match.logged_in_user == user.id or match.liked_by_user == user.id]}
