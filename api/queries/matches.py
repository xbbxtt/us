from pydantic import BaseModel
from datetime import date
from queries.pool import pool


class UserIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    location: str
    gender: int
    age: int
    description: str
    picture_url: str
    password: str
    matches: list
    likes: list


class UserOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    location: str
    gender: int
    age: int
    description: str
    picture_url: str
    password: str
    matches: list
    likes: list


class LikesIn(BaseModel):
    user1_id: int
    user2_id: int
    timestamp: date
    status: bool


class LikesOut(BaseModel):
    id: int
    user1_id: int
    user2_id: int
    timestamp: date
    status: bool


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
    gender_name: int


class GenderOut(BaseModel):
    id: int
    gender_name: int


class UserRepository:
    
    def delete_user():
        pass
    
    def update_user():
        pass


class GenderRepository:
    def create_gender(self, gender: GenderIn) -> GenderOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO gender (
                        gender_name
                    ) VALUES (
                        %s
                    )
                    RETURNING id;
                    """,
                    [gender.gender_name],
                )

                gender_id = result.fetchone()[0]
                old_data = gender.dict()
                return GenderOut(**old_data, id=gender_id)

class LikesRepository:
    def create_a_like():
        pass
