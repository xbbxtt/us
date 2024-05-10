## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.


## Database Models

Tables:

    gender - Houses genders to include 3 premade genders (Male, Female, Non-Binary). More maybe inserted into the table via migration.
        SERIAL PRIMARY KEY NOT NULL      - id                  - The unique identifier of each gender
        VARCHAR(20) NOT NULL             - gender_name         - The name of the gender as the user expects it (IE 'Male' or 'Female')

    Pre inserted genders:
        id = 1, gender_name = Male
        id = 2, gender_name = Female
        id = 3, gender_name = Non-Binary


    romantic_pref - Houses all users romantic preferences as designated by the user when finalizing their profile.
        SERIAL PRIMARY KEY NOT NULL      - id                  - The unique identifier of each user's romantic preference
        INT NOT NULL                     - user1_id            - The user this set of romantic preferences belongs to (Foreign Key of 'id' in users table)
        INT NOT NULL                     - min_age             - The minimum age the user wants to interact with
        INT NOT NULL                     - max_age             - The maximum age the user wants to interact with
        INT NOT NULL                     - gender_id           - The gender the user wants to interact with (Foreign Key of 'id' in gender table)


    likes - Houses all of the instinces in which one user has 'liked' another user.
        SERIAL PRIMARY KEY NOT NULL      - id                  - The unique identifier of each like instance
        INT NOT NULL                     - logged_in_user      - The user who is recieving the like (Foreign Key of 'id' in users table)
        INT NOT NULL                     - liked_by_user       - The user who is giving the like (Foreign Key of 'id' in users table)


    users - Houses all of the users who have created an account on the site.
        SERIAL PRIMARY KEY NOT NULL      - id                  - The unique identifier of each user instance
        VARCHAR(100)                     - username            - The username the user designated for themselves upon account creation
        VARCHAR(256)                     - password            - The password the user designated for themselves upon account creation
        VARCHAR(100)                     - first_name          - The first name the user designated for themselves upon account creation
        VARCHAR(100)                     - last_name           - The last name the user designated for themselves upon account creation
        VARCHAR(50)                      - location            - The location the user designated for themselves upon account creation
        INT                              - gender              - The gender the user designated for themselves upon account creation (Foreign Key of 'id' in gender table)
        INT                              - age                 - The age the user designated for themselves upon account creation
        VARCHAR(1000)                    - description         - The self description the user designated for themselves upon account creation
        VARCHAR(256)                     - picture_url         - The picture's url the user designated for themselves upon account creation


## API DOCUMENTATION

The application uses APIs to connect to a database for user management. Users can create profiles and verify connections to interact with others. They can set preferences such as gender and age range to swipe on potential matches.

User Authentication
Summary
Contains API routes and database queries for user authentication.

## API Routes

### Auth Routers
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

**PUT** /api/auth/likes/<int:id>: Update Like Status

    - Expected Input:
        - ID
        - {
        "logged_in_user": 0,
        "liked_by_user": 0,
        "status": true
        }
        or
        - {
        "logged_in_user": 0,
        "liked_by_user": 0,
        "status": false
        }

    - Expected Output:
        - {
        "logged_in_user": 0,
        "liked_by_user": 0,
        "status": true
        }
        or
        - {
        "logged_in_user": 0,
        "liked_by_user": 0,
        "status": false
        }

**GET** /api/auth/matches: Get User Matches

    - Expected Output:
        - {
        "additionalProp1": [
        {
        "id": 1,
        "logged_in_user": 1,
        "liked_by_user": 2
            }
        ],
        }


**GET** /api/auth/preferences: Filter by preferences

    - Expected output:
        - [
        {
            "id": 0,
            "picture_url": "string",
            "username": "string",
            "first_name": "string",
            "last_name": "string",
            "age": 0,
            "gender": 0,
            "description": "string"
        }
        ]

### Genders

**GET** /api/gender: Get all genders

    - Expected Output:
    [
        {
        "id": 0,
        "gender_name": 0
        }
    ]

### Likes

**POST** /api/likes: Create a like

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

**GET**  /api/likes: Get all likes

    - Expected Output
    {
    "additionalProp1": [
    {
      "id": 0,
      "logged_in_user": 0,
      "liked_by_user": 0,
      "status": true
    }
  ]
  }


### Preferences

**POST** /api/preferecnes: Create a preference

    - Expected input:
        {
        "user1_id": 0,
        "min_age": 0,
        "max_age": 0,
        "gender_id": 0
        }

    - Expected output:
        {
        "id": 0,
        "user1_id": 0,
        "min_age": 0,
        "max_age": 0,
        "gender_id": 0
        }

**GET** /api/preferences: Get all preferences

    - Expected output:
        [
        {
        "id": 0,
        "user1_id": 0,
        "min_age": 0,
        "max_age": 0,
        "gender_id": 0
        }
        ]

**PUT** /api/preferences/<int:id>: Update a preference

    - Expected input:
        {
        "user1_id": 0,
        "min_age": 0,
        "max_age": 0,
        "gender_id": 0
        }

    - Expected output:
        {
        "id": 0,
        "user1_id": 0,
        "min_age": 0,
        "max_age": 0,
        "gender_id": 0
        }



### Matches

**GET** - /api/user/matches - returns an array of all the matches that belong to the logged in user
        Expected Output:
        {
        "additionalProp1": [
            {
            "id": 0,
            "logged_in_user": 0,
            "liked_by_user": 0
            }
        ],
        "additionalProp2": [
            {
            "id": 0,
            "logged_in_user": 0,
            "liked_by_user": 0
            }
        ],
        "additionalProp3": [
            {
            "id": 0,
            "logged_in_user": 0,
            "liked_by_user": 0
            }
        ]
        }

**DELETE** - /api/user/matches/{match_id} - deletes a match belonging to the user at id=match_id
        Expected Output:
        "string"





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
