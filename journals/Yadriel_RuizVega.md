Day 1:
We worked in our wire frame diagrams, got assistance in our Docker container Issues. Replaced the Node from Bullseye to Latest in order to correct it
Day 2:
Began changing and creating our tables as well as started to incorporate them into the database.
Day 3:
We were able to finish our Create User(SignUp), we have full use of SignIn, authenticate, SignOut, search for all user and filter users by gender.





API DOCUMENTATION 

With the use of the APIs in this application we are able to connect to the database in order to create users. We are able to verify that the users are connected in order to see other users. With a logged in user you are able to swipe on other persons according to how you set your preferences. This allows you to choose a gender as well as a the age range you as the user would prefer. 


User Authentication
Summary
Contains API routes and database queries for user authentication.

API Routes
POST /api/auth/signup: Creates a new user when someone submits the signup form.
POST /api/auth/signin: Signs the user in when they use the Sign In form.
GET /api/auth/authenticate: Returns the user if the user is logged in.
DELETE /api/auth/signout: Signs the user out by deleting their JWT Cookie.
GET /api/auth/api/users: Get all users.
GET /api/auth/api/users/gender: Gets users by gender if a user is authenticated.
POST /api/auth/api/users: Creates a new user.
POST /api/auth/api/users/likes: Adds a like from one user to another.
GET /api/auth/api/users/matches: Retrieves a list of matches for a user.

Database Queries
get_by_username(username: str) -> Optional[UserWithPw]: Gets a user from the database by username. Returns None if the user isn't found.
get_by_id(id: int) -> Optional[UserWithPw]: Gets a user from the database by user id. Returns None if the user isn't found.
create_user(username: str, hashed_password: str, first_name: str, last_name: str, location: str, gender: int, age: int, description: str, picture_url: str) -> UserWithPw: Creates a new user in the database. Raises a UserDatabaseException if creating the user fails.
get_all() -> list[UserWithPw]: Gets all users from the database.
Additional Notes
These queries are used to interact with the Users table in the database.
They handle user retrieval, creation, and fetching all users.
Exceptions are raised if any database operation fails.
