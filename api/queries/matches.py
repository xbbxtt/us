from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List, Optional


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
    status: Optional[bool] = None


class LikesOut(BaseModel):
    id: int
    logged_in_user: int
    liked_by_user: int
    status: Optional[bool] = None


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


class MatchIn(BaseModel):
    liked_by_user: int


class MatchOut(BaseModel):
    id: int
    logged_in_user: int
    liked_by_user: int


class GenderRepository:
    def get_all_gender(self) -> List[GenderOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT
                        *
                    FROM gender
                    """
                )
                result = []
                for record in cur:
                    gender = GenderOut(id=record[0], gender_name=record[1])
                    result.append(gender)
                return result


class LikesRepository:
    def get_all_likes(self) -> List[LikesOut]:
        """
        Gets all likes from the database
        """
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT
                        *
                    FROM likes
                    """
                )
                result = []
                for record in cur:
                    like = LikesOut(
                        id=record[0],
                        logged_in_user=record[1],
                        liked_by_user=record[2],
                        status=record[3],
                    )
                    result.append(like)
                return result

    def create_a_like(
        self,
        logged_in_user: int,
        liked_by_user: int,
        status: Optional[bool] = None,
    ) -> LikesOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO likes (
                        logged_in_user,
                        liked_by_user,
                        status
                    ) VALUES (
                        %s, %s, %s
                    )
                    RETURNING *;
                    """,
                    [logged_in_user, liked_by_user, status],
                )
                like = cur.fetchone()
                old_data = {
                    "id": like[0],
                    "logged_in_user": like[1],
                    "liked_by_user": like[2],
                    "status": like[3],
                }
                return LikesOut(**old_data)

    def update_like_status(
        self, id: int, status: Optional[bool] = None
    ) -> LikesOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    UPDATE likes
                    SET status = %s
                    WHERE id = %s
                    RETURNING *;
                    """,
                    [status, id],
                )
                like = cur.fetchone()
                old_data = {
                    "id": like[0],
                    "logged_in_user": like[1],
                    "liked_by_user": like[2],
                    "status": like[3],
                }
                return LikesOut(**old_data)

    def delete_a_like(self, id: int) -> LikesOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    DELETE FROM likes
                    WHERE id = %s
                    RETURNING *;
                    """,
                    [id],
                )
                like = cur.fetchone()
                old_data = {
                    "id": like[0],
                    "logged_in_user": like[1],
                    "liked_by_user": like[2],
                    "status": like[3],
                }
                return LikesOut(**old_data)

    def create_a_match(
        self, logged_in_user: int, liked_by_user: int
    ) -> MatchOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO matches (
                        logged_in_user,
                        liked_by_user
                    ) VALUES (
                        %s, %s
                    )
                    RETURNING *;
                    """,
                    [logged_in_user, liked_by_user],
                )
                match = cur.fetchone()
                old_data = {
                    "id": match[0],
                    "logged_in_user": match[1],
                    "liked_by_user": match[2],
                }
                return MatchOut(**old_data)

    def get_all_matches(self, logged_in_user: int) -> List[MatchOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT
                        *
                    FROM matches
                    WHERE logged_in_user = %s OR liked_by_user = %s
                    """,
                    [logged_in_user, logged_in_user],
                )
                result = []
                for record in cur:
                    match = MatchOut(
                        id=record[0],
                        logged_in_user=record[1],
                        liked_by_user=record[2],
                    )
                    result.append(match)
                return result

    def delete_a_match(self, id: int) -> MatchOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    DELETE FROM matches
                    WHERE id = %s
                    RETURNING *;
                    """,
                    [id],
                )
                match = cur.fetchone()
                old_data = {
                    "id": match[0],
                    "logged_in_user": match[1],
                    "liked_by_user": match[2],
                }
                return MatchOut(**old_data)
