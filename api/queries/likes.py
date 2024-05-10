from queries.pool import pool
from typing import List, Optional
from models.matches import LikesOut


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
                cur.execute(
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
                cur.execute(
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
                cur.execute(
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
