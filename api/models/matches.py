from pydantic import BaseModel
from typing import Optional


class UserIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    location: str
    gender: int
    age: int
    description: str
    picture_url: str
    password: str
    matches: list
    likes: list


class UserOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    location: str
    gender: int
    age: int
    description: str
    picture_url: str
    password: str
    matches: list
    likes: list


class LikesIn(BaseModel):
    logged_in_user: int
    liked_by_user: int
    status: Optional[bool] = None


class LikesOut(BaseModel):
    id: int
    logged_in_user: int
    liked_by_user: int
    status: Optional[bool] = None


class InterestIn(BaseModel):
    user_id: int
    interest_name: str


class InterestOut(BaseModel):
    id: int
    user_id: int
    interest_name: str


class RomanticPreferenceIn(BaseModel):
    user_id: int
    gender_id: int


class RomanticPreferenceOut(BaseModel):
    id: int
    user_id: int
    gender_id: int


class GenderIn(BaseModel):
    gender_name: str


class GenderOut(BaseModel):
    id: int
    gender_name: str


class MatchIn(BaseModel):
    liked_by_user: int


class MatchOut(BaseModel):
    id: int
    logged_in_user: int
    liked_by_user: int


class PreferencesIn(BaseModel):
    user1_id: int
    min_age: int
    max_age: int
    gender_id: int


class PreferencesOut(BaseModel):
    id: int
    user1_id: int
    min_age: int
    max_age: int
    gender_id: int
