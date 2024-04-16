steps = [
    [
        # "Up" SQL statement
        """
        ALTER TABLE users
            ADD first_name VARCHAR(100) NOT NULL,
            ADD last_name VARCHAR(100) NOT NULL,
            ADD location VARCHAR(50) NOT NULL,
            ADD gender VARCHAR(10) NOT NULL,
            ADD age INTEGER NOT NULL,
            ADD description VARCHAR(1000) NOT NULL,
            ADD picture_url VARCHAR(256) NOT NULL,
            ADD likes INT,
            ADD CONSTRAINT fk_likes FOREIGN KEY (likes) REFERENCES likes(user2_id),
            ADD matches INT[];
        """,
        # "Down" SQL statement
        """
        DROP COLUMN first_name,
        DROP COLUMN last_name,
        DROP COLUMN location,
        DROP COLUMN gender,
        DROP COLUMN age,
        DROP COLUMN description,
        DROP COLUMN picture_url;
        """
    ]
]
