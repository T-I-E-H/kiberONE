CREATE TABLE Parents(
    id SERIAL PRIMARY KEY,
    PHONE_NUMBER INTEGER NOT NULL,
    NAME VARCHAR(60) NOT NULL,
    PASSWORD VARCHAR(60),
    REGISTER_DATE DATE,
    MUTE SMALLINT NOT NULL
);
CREATE TABLE Children(
    id INTEGER PRIMARY KEY,
    NAME VARCHAR NOT NULL
);

CREATE TABLE ChildParent(
    id_child INT NOT NULL REFERENCES Children(id) ON DELETE CASCADE,
    id_parent INT NOT NULL REFERENCES Parents(id) ON DELETE CASCADE
);

CREATE TABLE MissedLessons(
    id INT NOT NULL PRIMARY KEY,
    id_child INT NOT NULL REFERENCES Children(id) ON DELETE CASCADE,
    LOCATION_id INT,
    TOPIC VARCHAR(60),
    LDAY VARCHAR(20),
    STATE INT NOT NULL
);

CREATE TABLE Lessons(
    id INT NOT NULL PRIMARY KEY,
    TUTOR_id INT,
    LOCATION_id INT,
    LDAY VARCHAR(20),
    TIME VARCHAR(5),
    id_child INT REFERENCES Children(id) ON DELETE CASCADE,
    TOPIC VARCHAR(60),
    STATE INT NOT NULL
);

CREATE TABLE tutorsTime(
    id INT NOT NULL PRIMARY KEY,
    TUTOR_id INT,
    LOCATION_id INT,
    LDAY VARCHAR(20),
    TIME VARCHAR(5),
    STATE INT NOT NULL
)

CREATE TABLE refresh_sessions(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Parents(id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print VARCHAR(32) NOT NULL
);



SELECT * FROM users;
SELECT * FROM refresh_sessions;