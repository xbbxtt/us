04/15/2024

Today we worked on the User Model and polished our ideas as well as troubleshoot startup issues. Worked on wireframe and DB models.

04/16/2024

Today we worked on the User Model and polishing and finishing the relationships with other DBs.
We also added a new feature to our wireframe to support a "View Your Likes!" Feature


 04/17/2024
Today we sorted out the sign up and sign in method as well as sign out. We also found a way to filter users by their Gender and are planning on adding
the Likes methods tomorrow.

04/18/2024

Today we worked on getting the Likes function to work. The way it's set up is as a user sends a like, their id will be stored into a likes array
that the liked user will see. Once the liked user returns a like, both ids of the users will be moved to a matches array for each resepctive user


04/22/2024

We fixed our Databases and added a likes feature to our Wireframe where the user can see the likes they have received and then choose to accept or decline.
We are catching up on our documentation as well today.


Match:

Summary: Upon acceptance of a like, the user who sent the like is then moved to a matches array where there profile can be listed.
User_1: This will be the column in which the user who sent the like will be stored.

User Information Model
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
