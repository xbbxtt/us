"""
Pydantic Models for Users.
"""
from pydantic import BaseModel


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str
    first_name: str
    last_name: str
    location: str
    gender: int
    age: int
    description: str
    picture_url: str


class UserSignInRequest(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """
    id: int
    username: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    password: str
    first_name: str
    last_name: str
    location: str
    gender: int
    age: int
    description: str
    picture_url: str


class UserGender(BaseModel):
    id: int
    picture_url: str
    username: str
    first_name: str
    last_name: str
    age: int
    gender: int
    description : str
