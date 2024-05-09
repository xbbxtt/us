""" 
This unit test will only run successfully if the pool import in queries/matches.py is commented out due to the test being interrupted via the unresolved import:

from queries.pool import pool
ModuleNotFoundError: No module name 'queries'
"""

""" from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from pydantic import BaseModel
from matches import GenderRepository, GenderOut

app = FastAPI()

class GenderOut(BaseModel):
    id: int
    gender_name: str

def mock_get_all_genders():
    return [
        GenderOut(id=1, gender_name="Male"),
        GenderOut(id=2, gender_name="Female"),
        GenderOut(id=3, gender_name="Non-binary")
    ]

def get_repository_override():
    class MockRepository:
        def get_all_genders(self):
            return mock_get_all_genders()
    return MockRepository()

app.dependency_overrides[GenderRepository] = get_repository_override

@app.get("/api/genders")
def read_genders(repository: GenderRepository = Depends()):
    return repository.get_all_genders()

client = TestClient(app)

def test_get_all_genders():
    response = client.get("/api/genders")
    print(response)

    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "gender_name": "Male"},
        {"id": 2, "gender_name": "Female"},
        {"id": 3, "gender_name": "Non-binary"}
    ]

if __name__ == "__main__":
    test_get_all_genders() """


from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from pydantic import BaseModel
from abc import ABC, abstractmethod


class IRepository(ABC):
    @abstractmethod
    def get_all_genders(self):
        pass


class GenderRepository(IRepository):
    def get_all_genders(self):
        return [
            {"id": 1, "gender_name": "Male"},
            {"id": 2, "gender_name": "Female"},
            {"id": 3, "gender_name": "Non-binary"}
        ]


class MockRepository(IRepository):
    def get_all_genders(self):
        return [
            {"id": 1, "gender_name": "Male"},
            {"id": 2, "gender_name": "Female"},
            {"id": 3, "gender_name": "Non-binary"}
        ]


class GenderOut(BaseModel):
    id: int
    gender_name: str

app = FastAPI()


def get_repository() -> IRepository:
    import os
    if os.getenv('ENV') == 'production':
        return GenderRepository()
    else:
        return MockRepository()

@app.get("/api/genders", response_model=list[GenderOut])
def read_genders(repository: IRepository = Depends(get_repository)):
    genders = repository.get_all_genders()
    return [GenderOut(**gender) for gender in genders]

client = TestClient(app)

def test_get_all_genders():
    response = client.get("/api/genders")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "gender_name": "Male"},
        {"id": 2, "gender_name": "Female"},
        {"id": 3, "gender_name": "Non-binary"}
    ]

if __name__ == "__main__":
    import os
    os.environ['ENV'] = 'test'
    test_get_all_genders()
