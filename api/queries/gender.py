from queries.pool import pool
from typing import List
from models.matches import GenderOut


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
