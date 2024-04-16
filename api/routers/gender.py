from fastapi import APIRouter, Depends
from queries.matches import GenderIn, GenderOut, GenderRepository


router = APIRouter()


@router.post("/gender", response_model=GenderOut)
def create_gender(user: GenderIn, repo: GenderRepository = Depends()):
    return repo.create_gender(user)
