from fastapi import (
    Depends,
    Response,
    HTTPException,
    status,
    APIRouter,
)
from models.users import UserResponse
from typing import Dict, List
from utils.authentication import try_get_jwt_user_data
from queries.matches import MatchesRepository
from models.matches import MatchOut


router = APIRouter(tags=["Matches"], prefix="/api")


@router.get("/matches")
def get_user_matches(
    matches: MatchesRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> Dict[str, List[MatchOut]]:
    """
    Get all matches
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )

    matches = matches.get_all_matches(user.id)
    return {
        "matches": [
            MatchOut(**match.model_dump())
            for match in matches
            if match.logged_in_user == user.id
            or match.liked_by_user == user.id
        ]
    }


@router.delete("/user/matches/<int:id>")
def delete_match(
    match_id: int,
    queries: MatchesRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> Response:
    """
    Delete a match
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )

    queries.delete_a_match(match_id)
    return Response(status_code=status.HTTP_200_OK)
