from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List



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
    logged_in_user: int
    liked_by_user: int
    status: bool


class LikesOut(BaseModel):
    id: int
    logged_in_user: int
    liked_by_user: int
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
    gender_name: str


class GenderOut(BaseModel):
    id: int
    gender_name: str


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
    def get_all_likes(self) -> List[LikesOut]:
        """
        Gets all likes from the database
        """
        with pool.connection() as conn:
            with conn.cursor() as cur:
                print("anything")
                result = cur.execute(
                    """
                    SELECT
                        *
                    FROM likes
                    """
                    )
                result = []
                for record in cur:
                    like = LikesOut(id=record[0], logged_in_user=record[1],
                                    liked_by_user=record[2], status=record[3])
                    result.append(like)
                return result


    def create_a_like(self, logged_in_user: int, liked_by_user: int, status: bool) -> LikesOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO likes (
                        logged_in_user,
                        liked_by_user,
                        status
                    ) VALUES (
                        %s,
                        %s,
                        %s
                    )
                    RETURNING id;
                    """,
                    [logged_in_user, liked_by_user, status],
                )
                like_id = result.fetchone()[0]
                return LikesOut(
                    logged_in_user=logged_in_user,
                    liked_by_user=liked_by_user,
                    status=status,
                    id=like_id,
                )
