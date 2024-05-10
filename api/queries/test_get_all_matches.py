from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from pydantic import BaseModel
from typing import List


class MatchOut(BaseModel):
    id: int
    logged_in_user: int
    liked_by_user: int


class MockLikesRepository:
    def get_all_matches(self, logged_in_user: int) -> List[MatchOut]:
        return [
            MatchOut(id=1, logged_in_user=logged_in_user, liked_by_user=2),
            MatchOut(id=2, logged_in_user=logged_in_user, liked_by_user=3),
        ]


app = FastAPI()


@app.get("/api/matches/{user_id}", response_model=List[MatchOut])
def get_matches(user_id: int, repository: MockLikesRepository = Depends()):
    return repository.get_all_matches(logged_in_user=user_id)


client = TestClient(app)


def test_get_all_matches():
    response = client.get("/api/matches/1")

    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "logged_in_user": 1, "liked_by_user": 2},
        {"id": 2, "logged_in_user": 1, "liked_by_user": 3},
    ]


if __name__ == "__main__":
    test_get_all_matches()
