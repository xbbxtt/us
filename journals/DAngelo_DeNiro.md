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


01MAY2024:
Began development of the 'GetAllLikes' component which will display all of the the users who have 'liked' our logged in user, however considering the sign in page isn't functioning, I am unable to test whether the GetAllLikes component is actually working. It keeps returning a 401. Began tinkering with the Sign In form. I am now able to Sign In however I don't stay signed in when navigating to the likes page.


30APR2024:
Removed preferences column in users table in conjunction with worked on the SignUp page. Attempted to get a 'range slider' on the SignUp page for the user's age preferences. The decision was made to have a seperate page for the romantic preferences due to the romantic_pref table having a userID that owns that row in the table. This assumes that the user is already created. Pending issue: the actual preference not being linked to the user on the backend.

29APR2024:
Further mob programming for the front end. Planned design ideas to be implemented. 


26APR2024:
Ensured that the routes followed restful conventions. Mob programmed for frontend, specifically Signup page.

25APR2024:
We spoke to Riley again, he commented that our routes aren't restful. Revisited the learn cards for a refresher on restful conventions. Further planning was conducted on how exactly the backend will tie into the frontend.

24APR2024:
Further matches table editing and planning for the backend.


23APR2024:
Loaded male, female, non-binary default genders into genders table to be created whenever the database is loaded in conjunction with creating an instance of a user for each of the genders to be loaded as well.

22APR2024:
Created a likes table which required lotss of changes, recreated matches table, fixed romantic_pref table to include user1_id as a ForeignKey to the users table, completed documentation for gender, romantic_pref, and likes tables, created a likes function, started but not finished the get_all_likes function. Further edited the likes table.


18APR2024:
Restructured database in accordance with Riley's design advice.

17APR2024:
Completed Signup, Signin, Authenticate, and Signout as well as Get All users.

16APR2024:
Peer coded models and migrations in conjunction with gender repository being created for fastapi.

15APR2024:
Planned most of how our database tables are going to be made as well as creating the users, matches, interests, romantic_pref, and gender tables. Finished create_user route, and solved incompatible database migration issue. 


