from fastapi import APIRouter, Depends
from queries.matches import LikesRepository, LikesIn, LikesOut


router = APIRouter()


@router.post("api/likes", response_model=LikesOut)
def create_a_like(like: LikesIn, repo: LikesRepository = Depends()):
    return repo.create_a_like(like)


@router.get("api/likes/all", response_model=list[LikesOut])
def get_all_likes(repo: LikesRepository = Depends()):
    return repo.get_all_likes()
