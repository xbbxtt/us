from fastapi import (
    Depends,
    APIRouter,
)
from typing import List
from queries.matches import GenderOut, GenderRepository


router = APIRouter(tags=["Gender"], prefix="/api/gender")


# get all the genders from the database
@router.get("/all")
async def get_all_gender(
    queries:GenderRepository = Depends(),
) -> List[GenderOut]:
    """
    Get all genders
    """
    genders = queries.get_all_gender()
    return [GenderOut(**gender.model_dump())for gender in genders]
