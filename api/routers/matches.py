from fastapi import APIRouter, Depends
from queries.matches import UserIn, UserOut, UserRepository


router = APIRouter()


@router.post("/users", response_model=UserOut)
def create_user(user: UserIn, repo: UserRepository = Depends()):
    return repo.create_user(user)


