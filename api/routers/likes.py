from fastapi import APIRouter, Depends, HTTPException, status
from utils.authentication import try_get_jwt_user_data
from queries.likes import LikesRepository
from models.users import UserResponse
from typing import Dict, List
from models.matches import LikesIn, LikesOut
from queries.matches import MatchesRepository

router = APIRouter(tags=["Likes"], prefix="/api")


@router.post("/likes")
def create_a_like(
    likes: LikesIn,
    queries: LikesRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> LikesOut:
    """
    Create a like
    """
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in"
        )
    likes.liked_by_user = user.id
    likes = queries.create_a_like(
        likes.logged_in_user,
        likes.liked_by_user,
        likes.status,
    )
    return LikesOut(**likes.model_dump())


@router.get("/likes")
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
    return {
        "likes": [
            LikesOut(**like.model_dump())
            for like in likes
            if like.logged_in_user == user.id
        ]
    }


@router.put("/likes/<int:id>")
def update_like_status(
    id: int,
    likes: LikesIn,
    queries: LikesRepository = Depends(),
    matches: MatchesRepository = Depends(),
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
        matches.create_a_match(likes.logged_in_user, likes.liked_by_user)
        queries.delete_a_like(likes.id)
    else:
        queries.delete_a_like(likes.id)

    return LikesOut(**likes.model_dump())
