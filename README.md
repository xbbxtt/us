# Module3 Project Gamma

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

-   Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
-   Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

-   [ ] Wire-frame diagrams
-   [ ] API documentation
-   [ ] Project is deployed to Caprover (BE, DB) & GitLab-pages (FE)
-   [ ] GitLab issue board is setup and in use (or project management tool of choice)
-   [ ] Journals


# Wireframe
![Alt text](Home-us.png)
![Alt text](<Sign up-Us.png>)
![Alt text](<Sign In-Us.png>)
![Alt text](<Us-Romantic Preference.png>)
![Alt text](Likes-Us.png)
![Alt text](Swiping.png)
![Alt text](Matches-Us.png)

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

# API Routes
POST /api/auth/signup: Creates a new user when someone submits the signup form

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


POST /api/auth/signin: Signs the user in when they use the Sign In form

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


GET /api/auth/authenticate: Returns the user if the user is logged in

- Expected Response:
{
"id": 0,
"username": "string"
}


DELETE /api/auth/signout: Signs the user out by deleting their JWT Cookie

- Expected Output:
"Signed out successfully"


GET /api/auth/api/users: Get all users

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


GET /api/auth/api/users/gender: Gets users by gender if a user is authenticated

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


POST /api/auth/api/users/likes: Adds a like from one user to another

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


GET /api/auth/api/users/matches: Retrieves a list of matches for a user

- Expected Output:

[
    {
    "id": 1,
    "logged_in_user": 5,
    "liked_by_user": 5,
    "status": true
    }
]
## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `api`, are services, that
you can start building off of.

Inside of `ghi` is a minimal React app that has an "under construction" page.
This app is written using the [Vite](https://vitejs.dev/) bundler. The example
code is also using [jsdoc](https://jsdoc.app/) to provide type hints for
JavaScript. You are not required to use JSDoc yourself, and you will be removing
these examples and providing your own code for `App.jsx`

Inside of `api` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `api` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

-   `docker-compose.yaml`: there isn't much in here, just a
    **really** simple UI and FastAPI service. Add services
    (like a database) to this file as you did with previous
    projects in module #2.
-   `.gitlab-ci.yml`: This is your "ci/cd" file where you will
    configure automated unit tests, code quality checks, and
    the building and deployment of your production system.
    Currently, all it does is deploy an "under construction"
    page to your production UI on GitLab and a sample backend
    to CapRover. We will learn much more about this file.
-   `.gitignore`: This is a file that prevents unwanted files
    from getting added to your repository, files like
    `pyc` files, `__pycache__`, etc. We've set it up so that
    it has a good default configuration for Python projects.
-   `.env.sample`: This file is a template to copy when
    creating environment variables for your team. Create a
    copy called `.env` and put your own passwords in here
    without fear of it being committed to git (see `.env`
    listed in `.gitignore`). You can also put team related
    environment variables in here, things like api and signing
    keys that shouldn't be committed; these should be
    duplicated in your deployed environments.

### Installing python dependencies locally

In order for VSCode's built in code completion and intelligence to
work correctly, it needs the dependencies from the requirements.txt file
installed. We do this inside docker, but not in the workspace.

So we need to create a virtual environment and pip install the requirements.

From inside the `api` folder:

```bash
python -m venv .venv
```

Then activate the virtual environment

```bash
source .venv/bin/activate
```

And finally install the dependencies

```bash
pip install -r requirements.txt
```

Then make sure the venv is selected in VSCode by checking the lower right of the
VSCode status bar

### Setup GitLab repo/project

-   make sure this project is in a group. If it isn't, stop
    now and move it to a GitLab group
-   remove the fork relationship: In GitLab go to:

    Settings -> General -> Advanced -> Remove fork relationship

-   add these GitLab CI/CD variables:
    -   PUBLIC_URL : this is your gitlab pages URL
    -   VITE_APP_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME
