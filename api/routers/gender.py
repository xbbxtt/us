from fastapi import (
    Depends,
    APIRouter,
)
from typing import List
from queries.gender import GenderRepository
from models.matches import GenderOut


router = APIRouter(tags=["Gender"], prefix="/api")


@router.get("/genders")
async def get_all_gender(
    queries: GenderRepository = Depends(),
) -> List[GenderOut]:
    """
    Get all genders
    """
    genders = queries.get_all_gender()
    return [GenderOut(**gender.model_dump()) for gender in genders]
