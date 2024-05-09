from fastapi import (
    Depends,
)

from queries.user_queries import (
    UserQueries,
)

from models.users import UserGender


@router.get("/users")
async def get_all_users(
    queries: UserQueries = Depends(),
) -> list[UserGender]:
    """
    Get all users
    """
    users = queries.get_all()
    return [UserGender(**user.model_dump()) for user in users]
