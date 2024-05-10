from queries.pool import pool
from typing import List
from models.matches import PreferencesOut


class PreferencesRepository:
    def create_a_preference(
        self, user1_id: int, min_age: int, max_age: int, gender_id: int
    ) -> PreferencesOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO romantic_pref (
                        user1_id,
                        min_age,
                        max_age,
                        gender_id
                        ) VALUES (
                            %s, %s, %s, %s
                            ) RETURNING *;
                    """,
                    [user1_id, min_age, max_age, gender_id],
                )
                result = cur.fetchone()
                data_dict = {
                    "id": result[0],
                    "user1_id": result[1],
                    "min_age": result[2],
                    "max_age": result[3],
                    "gender_id": result[4],
                }

                return PreferencesOut(**data_dict)

    def update_a_preference(
        self, user1_id: int, min_age: int, max_age: int, gender_id: int
    ) -> PreferencesOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE romantic_pref
                    SET min_age = %s,
                        max_age = %s,
                        gender_id = %s
                    WHERE user1_id = %s
                    RETURNING *;
                    """,
                    [min_age, max_age, gender_id, user1_id],
                )
                result = cur.fetchone()
                data_dict = {
                    "id": result[0],
                    "user1_id": result[1],
                    "min_age": result[2],
                    "max_age": result[3],
                    "gender_id": result[4],
                }
                return PreferencesOut(**data_dict)

    def get_all_preferences(self) -> List[PreferencesOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM romantic_pref;
                    """
                )
                result = []
                for record in cur:
                    preference = PreferencesOut(
                        id=record[0],
                        user1_id=record[1],
                        min_age=record[2],
                        max_age=record[3],
                        gender_id=record[4],
                    )
                    result.append(preference)
                return result
