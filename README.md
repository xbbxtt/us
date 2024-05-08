# Us by Match Makers

---

-   Sean Lim
-   D'Angelo DeNiro
-   Yadriel Ruiz Vega
-   Michaela Arteberry

## Functionality

---

Visitors to the site can sign up or sign in to their account. They will set their romantic preferences that will filter the other users on our application, and reveal those filtered users to the current user. The user can make 'swipes'(click and drag), or simply press a like or dislike button on a user card that appears to them. A user can view other users that have given them a like. A user can return a like, or decline a like with a push of a button. A user can view a page that has their matches, users they have likes, who also liked them back.

## Intended Market

---

We are targeting individuals that want to connect with others, to start a romantic relationship.

## Project Initialization

---

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create database_volume
4. Run docker compose build
5. Run docker compose up
6. Run docker exec -it us-api-1 bash
7. Exit the container's CLI, and enjoy US to its fullest!

### Installing python dependencies locally

---

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
