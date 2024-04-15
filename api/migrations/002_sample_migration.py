steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            location VARCHAR(50) NOT NULL,
            gender VARCHAR(10) NOT NULL,
            age INTEGER NOT NULL,
            interest VARCHAR(10) NOT NULL,
            description VARCHAR(1000) NOT NULL,
            picture_url VARCHAR(256) NOT NULL,
            romantic_pref VARCHAR(10) NOT NULL,
            password VARCHAR(100) NOT NULL

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
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
    ]
]
