from queries.pool import pool
from typing import List
from models.matches import MatchOut


class MatchesRepository:

    def create_a_match(
        self, logged_in_user: int, liked_by_user: int
    ) -> MatchOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
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
                cur.execute(
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
