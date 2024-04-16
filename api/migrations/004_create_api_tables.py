steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY NOT NULL,
            user1_id SMALLSERIAL NOT NULL,
            user2_id SMALLSERIAL NOT NULL,
            status BOOLEAN NULL,
            timestamp TIMESTAMP NOT NULL,
            UNIQUE (user2_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
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
