steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE project_user (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            location VARCHAR(50) NOT NULL,
            gender SMALLSERIAL NOT NULL,
            age INTEGER NOT NULL,
            description VARCHAR(1000) NOT NULL,
            picture_url VARCHAR(256) NOT NULL,
            password VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE project_user;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE matches (
            id SERIAL PRIMARY KEY NOT NULL,
            user1_id SMALLSERIAL NOT NULL,
            user2_id SMALLSERIAL NOT NULL,
            status VARCHAR(10) NOT NULL,
            timestamp TIMESTAMP NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE matches;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE interests (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SMALLSERIAL NOT NULL,
            interest_name VARCHAR(30) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE interests;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE romantic_pref (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SMALLSERIAL NOT NULL,
            gender_id SMALLSERIAL NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE romantic_pref;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE gender (
            id SERIAL PRIMARY KEY NOT NULL,
            gender_name VARCHAR(20) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE gender;
        """
    ],
]
