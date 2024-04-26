from fastapi import APIRouter, Depends, HTTPException, status
from utils.authentication import try_get_jwt_user_data
from queries.matches import LikesRepository, LikesIn, LikesOut
from models.users import UserResponse
from typing import Dict, List


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
    likes.logged_in_user = user.id
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
