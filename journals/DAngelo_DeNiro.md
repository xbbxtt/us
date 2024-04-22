Database Model Documentation

gender TABLE        - Database holds information for available genders a user can designate as their own, for example: Male, Female etc. This database table is intended to grow and shrink in accordance with societal norms.
    id              - SERIAL Given automatically when a gender is added to the table
    gender_name     - VARCHAR(20) the string representation of the specific gender, and how it will appear for the user within the application

romantic_pref TABLE - Database holds information for a user's romantic preferences in order to display appropriate potential users that are appropraitely able to be matched with the logged-in user. 
    id              - SERIAL given automatically to identify the instance of the romantic preferences table
    user1_id        - INT the user's ID that this set of romantic preferences belongs to. Foreign key of user TABLE
    min_age         - INT the minimum age that the user is seeking 
    max_age         - INT the maximum age that the user is seeking
    gender_id       - INT the gender the user is seeking. Foreign key of gender TABLE

likes TABLE         - Database holds information for every instance a user using the appplication has "liked" another user
    id              - SERIAL given automatically to identify the instance of a user "liking" another user
    logged_in_user  - INT the ID of the user who initially liked another user. Foreign key of user TABLE
    liked_by_user   - INT the ID of the user who may, or may not have liked them back. Foreign key of the user TABLE
    status          - BOOLEAN whether both of the users have liked each other. NULL is assigned whenever the liked_by_user has not yet made a decision with the logged_in_users profile, FALSE is used when they dislike it