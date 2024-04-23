steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE gender (
            id SERIAL PRIMARY KEY NOT NULL,
            gender_name VARCHAR(20) NOT NULL
        );
        INSERT INTO gender (gender_name) VALUES ('Male'), ('Female'), ('Non-Binary');
        """,
        # "Down" SQL statement
        """
        DROP TABLE gender;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE romantic_pref (
            id SERIAL PRIMARY KEY NOT NULL,
            user1_id INT NOT NULL,
            min_age INT NOT NULL,
            max_age INT NOT NULL,
            gender_id INT NOT NULL,
            CONSTRAINT fk_gender FOREIGN KEY (gender_id) REFERENCES gender(id),
            CONSTRAINT fk_user1 FOREIGN KEY (user1_id) REFERENCES users(id)
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
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY NOT NULL,
            logged_in_user INT NOT NULL,
            liked_by_user INT NOT NULL,
            status BOOLEAN DEFAULT NULL,
            CONSTRAINT fk_user1 FOREIGN KEY (logged_in_user) REFERENCES users(id),
            CONSTRAINT fk_user2 FOREIGN KEY (liked_by_user) REFERENCES users(id)
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
        CREATE TABLE matches (
            id SERIAL PRIMARY KEY NOT NULL,
            liked_by_user INT NOT NULL,
            CONSTRAINT fk_user1 FOREIGN KEY (liked_by_user) REFERENCES users(id)
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
        ALTER TABLE users
            ADD first_name VARCHAR(100) NOT NULL,
            ADD last_name VARCHAR(100) NOT NULL,
            ADD location VARCHAR(50) NOT NULL,
            ADD gender INT NOT NULL,
            ADD age INTEGER NOT NULL,
            ADD description VARCHAR(1000) NOT NULL,
            ADD picture_url VARCHAR(256) NOT NULL,
            ADD preferences INT,
            ADD CONSTRAINT fk_gender FOREIGN KEY (gender) REFERENCES gender(id),
            ADD CONSTRAINT fk_romantic_pref FOREIGN KEY (preferences) REFERENCES romantic_pref(id);

        INSERT INTO users (username, password, first_name, last_name, location, gender, age, description, picture_url)
        VALUES ('dangelodeniro', 'string', 'D''Angelo', 'DeNiro', 'Colorado', 1, 28, 'string', 'string'),
               ('yadrielruiz', 'string', 'Yadriel', 'Ruiz', 'Texas', 1, 26, 'string', 'string'),
               ('keygomez', 'string', 'Key', 'Gomez', 'Texas', 3, 25, 'string', 'string'),
               ('michaelaarteberry', 'string', 'Michaela', 'Arteberry', 'Texas', 2, 25, 'string', 'string');
        """,
        # "Down" SQL statement
        """
        ALTER TABLE users
            DROP COLUMN first_name,
            DROP COLUMN last_name,
            DROP COLUMN location,
            DROP COLUMN gender,
            DROP CONSTRAINT fk_gender,
            DROP COLUMN age,
            DROP COLUMN description,
            DROP COLUMN picture_url,
            DROP COLUMN preferences,
            DROP CONSTRAINT fk_romantic_pref;
        """
    ]
]