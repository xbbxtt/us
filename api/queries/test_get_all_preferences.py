from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from pydantic import BaseModel
from typing import List


class PreferencesOut(BaseModel):
    id: int
    user1_id: int
    min_age: int
    max_age: int
    gender_id: int


class MockPreferencesRepository:
    def get_all_preferences(self) -> List[PreferencesOut]:
        return [
            PreferencesOut(
                id=1, user1_id=1, min_age=18, max_age=30, gender_id=1
            ),
            PreferencesOut(
                id=2, user1_id=2, min_age=25, max_age=35, gender_id=2
            ),
        ]


app = FastAPI()


@app.get("/api/preferences", response_model=List[PreferencesOut])
def get_preferences(repository: MockPreferencesRepository = Depends()):
    return repository.get_all_preferences()


client = TestClient(app)


def test_get_all_preferences():
    response = client.get("/api/preferences")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "user1_id": 1, "min_age": 18, "max_age": 30, "gender_id": 1},
        {"id": 2, "user1_id": 2, "min_age": 25, "max_age": 35, "gender_id": 2},
    ]


if __name__ == "__main__":
    test_get_all_preferences()
