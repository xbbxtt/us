from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from pydantic import BaseModel
from typing import List


class GenderOut(BaseModel):
    id: int
    gender_name: str


class MockGenderRepository:
    def get_all_gender(self) -> List[GenderOut]:

        return [
            GenderOut(id=1, gender_name="Male"),
            GenderOut(id=2, gender_name="Female"),
            GenderOut(id=3, gender_name="Non-binary"),
        ]


app = FastAPI()


@app.get("/api/genders", response_model=List[GenderOut])
def get_genders(repository: MockGenderRepository = Depends()):
    return repository.get_all_gender()


client = TestClient(app)


def test_get_all_genders():
    response = client.get("/api/genders")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "gender_name": "Male"},
        {"id": 2, "gender_name": "Female"},
        {"id": 3, "gender_name": "Non-binary"},
    ]


if __name__ == "__main__":
    test_get_all_genders()
