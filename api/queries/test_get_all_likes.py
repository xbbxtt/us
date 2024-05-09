from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from pydantic import BaseModel
from typing import List, Optional


class LikesOut(BaseModel):
    id: int
    logged_in_user: int
    liked_by_user: int
    status: Optional[bool] = None


class MockLikesRepository:
    def get_all_likes(self) -> List[LikesOut]:
        return [
            LikesOut(id=1, logged_in_user=1, liked_by_user=2, status=True),
            LikesOut(id=2, logged_in_user=2, liked_by_user=1, status=False)
        ]


app = FastAPI()


@app.get("/api/likes", response_model=List[LikesOut])
def get_likes(repository: MockLikesRepository = Depends()):
    return repository.get_all_likes()


client = TestClient(app)


def test_get_all_likes():
    response = client.get("/api/likes")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "logged_in_user": 1, "liked_by_user": 2, "status": True},
        {"id": 2, "logged_in_user": 2, "liked_by_user": 1, "status": False}
    ]


if __name__ == "__main__":
    test_get_all_likes()
