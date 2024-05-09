# from fastapi import FastAPI, Depends
# from fastapi.testclient import TestClient
# from matches import LikesRepository, LikesOut
# from pydantic import BaseModel
# from typing import Optional

# app = FastAPI()


# class LikesOut(BaseModel):
#     id: int
#     logged_in_user: int
#     liked_by_user: int
#     status: Optional[bool] = None


# def mock_get_all_likes():
#     return [
#         LikesOut(id=1, logged_in_user=1, liked_by_user=2, status=None)
#     ]


# def get_repository_override():
#     class MockRepository():
#         def get_all_likes(self):
#             return mock_get_all_likes()
#     return MockRepository


# app.dependency_overrides[LikesRepository]=get_repository_override()


# @app.get("/api/likes")
# def read_likes(repository: LikesRepository = Depends()):
#     return repository.get_all_likes()


# client = TestClient(app)


# def test_get_all_likes():
#     response = client.get("/api/likes")
#     assert response.status_code == 200
#     assert response.json() == [
#         {"id": 1,
#         "logged_in_user": 1,
#         "liked_by_user": 2,
#         "status": None
#         }
#     ]

# if __name__ == "__main__":
#     test_get_all_likes()

from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI()


class LikesOut(BaseModel):
    id: int
    logged_in_user: int
    liked_by_user: int
    status: Optional[bool] = None


class LikesRepository:
    def get_all_likes(self) -> List[LikesOut]:
        raise NotImplementedError


class RealLikesRepository(LikesRepository):
    def get_all_likes(self) -> List[LikesOut]:
        # Here you would implement the actual database query logic
        # For demonstration, let's return some mock data
        return [
            LikesOut(id=1, logged_in_user=1, liked_by_user=2, status=None)
        ]


class MockLikesRepository(LikesRepository):
    def get_all_likes(self) -> List[LikesOut]:
        # This is a mock implementation for testing purposes
        return [
            LikesOut(id=1, logged_in_user=1, liked_by_user=2, status=None)
        ]


def get_repository() -> LikesRepository:
    # This function returns the appropriate repository implementation based on the environment
    # For actual application, return the real repository
    # For testing, return the mocked repository
    return RealLikesRepository()  # Use the real repository in production


@app.get("/api/likes", response_model=List[LikesOut])
def read_likes(repository: LikesRepository = Depends(get_repository)):
    return repository.get_all_likes()


client = TestClient(app)


def test_get_all_likes():
    # Override the dependency during testing to use the mock repository
    app.dependency_overrides[LikesRepository] = MockLikesRepository

    try:
        response = client.get("/api/likes")
        assert response.status_code == 200
        assert response.json() == [
            {
                "id": 1,
                "logged_in_user": 1,
                "liked_by_user": 2,
                "status": None
            }
        ]
    finally:
        # Remove the dependency override after the test completes
        app.dependency_overrides.pop(LikesRepository)


if __name__ == "__main__":
    test_get_all_likes()
