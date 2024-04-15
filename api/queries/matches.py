from pydantic import BaseModel
from typing import Optional
from datetime import date
from queries.pool import pool


class UserIn(BaseModel):
    first_name: str
    last_name: str
    location: str
    gender: int
    age: int
    description: str
    picture_url: str
    password: str


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    location: str
    gender: int
    age: int
    description: str
    picture_url: str
    password: str


class MatchIn(BaseModel):
    user1_id: int
    user2_id: int
    status: str
    timestamp: date 


class MatchOut(BaseModel):
    id: int
    user1_id: int
    user2_id: int
    status: str
    timestamp: date 


class InterestIn(BaseModel):
    user_id: int
    interest_name: str


class InterestOut(BaseModel):
    id: int
    user_id: int
    interest_name: str


class RomanticPreferenceIn(BaseModel):
    user_id: int
    gender_id: int


class RomanticPreferenceOut(BaseModel):
    id: int
    user_id: int
    gender_id: int


class GenderIn(BaseModel):
    gender_name: str


class GenderOut(BaseModel):
    id: int
    gender_name: str


class UserRepository:

    def create_user(self, user: UserIn) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO project_user (
                        first_name,
                        last_name,
                        location,
                        gender,
                        age,
                        description,
                        picture_url,
                        password
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s
                    )
                    RETURNING id;
                    """,
                    [
                        user.first_name,
                        user.last_name,
                        user.location,
                        user.gender,
                        user.age,
                        user.description,
                        user.picture_url,
                        user.password,
                    ]
                )

                id = result.fetchone()[0]
                old_data = user.dict()
                return UserOut(**old_data, id=id)