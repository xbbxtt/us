## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.


# Database Model Documentation

## gender TABLE:
### Summary: Database holds information for available genders a user can designate as their own, for example: Male, Female etc. This database table is intended to grow and shrink in accordance with societal norms.
    id              - SERIAL Given automatically when a gender is added to the table
    gender_name     - VARCHAR(20) the string representation of the specific gender, and how it will appear for the user within the application

## romantic_pref TABLE
### Summary: Database holds information for a user's romantic preferences in order to display appropriate potential users that are appropraitely able to be matched with the logged-in user.
    id              - SERIAL given automatically to identify the instance of the romantic preferences table
    user1_id        - INT the user's ID that this set of romantic preferences belongs to. Foreign key of user TABLE
    min_age         - INT the minimum age that the user is seeking
    max_age         - INT the maximum age that the user is seeking
    gender_id       - INT the gender the user is seeking. Foreign key of gender TABLE

## likes TABLE
### Summary: Database holds information for every instance a user using the appplication has "liked" another user
    id              - SERIAL given automatically to identify the instance of a user "liking" another user
    logged_in_user  - INT the ID of the user who initially liked another user. Foreign key of user TABLE
    liked_by_user   - INT the ID of the user who may, or may not have liked them back. Foreign key of the user TABLE
    status          - BOOLEAN whether both of the users have liked each other. NULL is assigned whenever the liked_by_user has not yet made a decision with the logged_in_users profile, FALSE is used when they dislike it

## Match TABLE:
Summary: Upon acceptance of a like, the user who sent the like is then moved to a matches array where there profile can be listed.
    User_1: This will be the column in which the user who sent the like will be stored.

## User_Information TABLE:
### Summary: A collection of information to be stored under a User table which will be used to create an User Profile where they can meet and match with other people that can lead to a potential romantic relationship.
    User ID: An unique identifier for each user instance created in the Database
    First_Name: First name of the user
    Last_Name: Last name of the user
    Password: A protected string known only to the user and administrators
    Location: The vicinity in which the user is located/would like to be shown
    Gender: A foreign key that organizes a user by their gender
    Picture_Url: A photo of the user
    Matches: A list of their matches
    Preferences: The gender that the user is interested in which will be used to display other potential users on the likes page.


## API DOCUMENTATION 

The application uses APIs to connect to a database for user management. Users can create profiles and verify connections to interact with others. They can set preferences such as gender and age range to swipe on potential matches.

User Authentication
Summary
Contains API routes and database queries for user authentication.

## API Routes

**POST** /api/auth/signup: Creates a new user when someone submits the signup form

    - Expected input:
        {
    "username": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string",
    "location": "string",
    "gender": 0,
    "age": 0,
    "description": "string",
    "picture_url": "string"
        }

    - Expected Output:
    {
    "id": 0,
    "username": "string"
    }


**POST** /api/auth/signin: Signs the user in when they use the Sign In form

    - Expected Input:
    {
    "username": "string",
    "password": "string"
    }

    Expected Output:
    {
    "id": 0,
    "username": "string"
    }   

**GET** /api/auth/authenticate: Returns the user if the user is logged in

    - Expected Response:
    {
    "id": 0,
    "username": "string"
    }

**DELETE** /api/auth/signout: Signs the user out by deleting their JWT Cookie

    - Expected Output:
    "Signed out successfully"

**GET** /api/auth/api/users: Get all users

    - Expected Output:
    [
        {
        "id": 0,
        "username": "string",
        "first_name": "string",
        "last_name": "string",
        "age": 0,
        "gender": 0
        }
    ]

**GET** /api/auth/api/users/gender: Gets users by gender if a user is authenticated

    - Expected Output:
    [
        {
        "id": 0,
        "username": "string",
        "first_name": "string",
        "last_name": "string",
        "age": 0,
        "gender": 0
        }
    ]


**POST** /api/auth/api/users/likes: Adds a like from one user to another

    - Expected Input:
    {
    "logged_in_user": 1,
    "liked_by_user": 2,
    "status": true
    }

    - Expected Output:
    {
    "id": 1,
    "logged_in_user": 1,
    "liked_by_user": 2,
    "status": true
    }


**GET** /api/auth/api/users/matches: Retrieves a list of matches for a user

    - Expected Output:
    
    [
        {
        "id": 1,
        "logged_in_user": 5,
        "liked_by_user": 5,
        "status": true
        }
    ]


## Database Queries

get_by_username(username: str) -> Optional[UserWithPw]: Gets a user from the database by username. Returns None if the user isn't found.

get_by_id(id: int) -> Optional[UserWithPw]: Gets a user from the database by user id. Returns None if the user isn't found.

create_user(username: str, hashed_password: str, first_name: str, last_name: str, location: str, gender: int, age: int, description: str, picture_url: str) -> 
UserWithPw: Creates a new user in the database. Raises a UserDatabaseException if creating the user fails.

get_all() -> list[UserWithPw]: Gets all users from the database.

### Additional Notes
These queries are used to interact with the Users table in the database.
They handle user retrieval, creation, and fetching all users.
Exceptions are raised if any database operation fails.
