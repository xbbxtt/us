## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.


Database Model Documentation

gender TABLE:
Summary: Database holds information for available genders a user can designate as their own, for example: Male, Female etc. This database table is intended to grow and shrink in accordance with societal norms.
    id              - SERIAL Given automatically when a gender is added to the table
    gender_name     - VARCHAR(20) the string representation of the specific gender, and how it will appear for the user within the application

romantic_pref TABLE
Summary: Database holds information for a user's romantic preferences in order to display appropriate potential users that are appropraitely able to be matched with the logged-in user.
    id              - SERIAL given automatically to identify the instance of the romantic preferences table
    user1_id        - INT the user's ID that this set of romantic preferences belongs to. Foreign key of user TABLE
    min_age         - INT the minimum age that the user is seeking
    max_age         - INT the maximum age that the user is seeking
    gender_id       - INT the gender the user is seeking. Foreign key of gender TABLE

likes TABLE
Summary: Database holds information for every instance a user using the appplication has "liked" another user
    id              - SERIAL given automatically to identify the instance of a user "liking" another user
    logged_in_user  - INT the ID of the user who initially liked another user. Foreign key of user TABLE
    liked_by_user   - INT the ID of the user who may, or may not have liked them back. Foreign key of the user TABLE
    status          - BOOLEAN whether both of the users have liked each other. NULL is assigned whenever the liked_by_user has not yet made a decision with the logged_in_users profile, FALSE is used when they dislike it

Match TABLE:
Summary: Upon acceptance of a like, the user who sent the like is then moved to a matches array where there profile can be listed.
    User_1: This will be the column in which the user who sent the like will be stored.

User_Information TABLE:
Summary: A collection of information to be stored under a User table which will be used to create an User Profile where they can meet and match with other people that can lead to a potential romantic relationship.
    User ID: An unique identifier for each user instance created in the Database
    First_Name: First name of the user
    Last_Name: Last name of the user
    Password: A protected string known only to the user and administrators
    Location: The vicinity in which the user is located/would like to be shown
    Gender: A foreign key that organizes a user by their gender
    Picture_Url: A photo of the user
    Matches: A list of their matches
    Preferences: The gender that the user is interested in which will be used to display other potential users on the likes page.
