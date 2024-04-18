create table user_info (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR NOT NULL,
	age VARCHAR NOT NULL,
	weight VARCHAR NOT NULL,
	height VARCHAR NOT NULL
);

create table diagnostics (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	location VARCHAR NOT NULL,
    user_id BIGINT REFERENCES user_info(id),
    UNIQUE (user_id)
);

create table blood_sugar (
	id BIGSERIAL NOT NULL PRIMARY KEY,
    date VARCHAR NOT NULL,
	fasting VARCHAR,
    postprandial VARCHAR,
    random VARCHAR,
    user_id BIGINT REFERENCES user_info(id),
    UNIQUE (user_id)
);

create table blood_pressure (
	id BIGSERIAL NOT NULL PRIMARY KEY,
    date VARCHAR NOT NULL,
	systolic VARCHAR,
    diastolic VARCHAR,
    pulse VARCHAR,
    user_id BIGINT NOT NULL
);