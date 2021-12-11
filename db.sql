CREATE DATABASE telstra_vehicles;

-- \c telstra_vehicles

CREATE TABLE testing(
    test_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE cars(
    car_id SERIAL PRIMARY KEY,
    registration_number VARCHAR(10) NOT NULL UNIQUE,
    year SMALLINT NOT NULL CHECK (year > 1800),
    color TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL
);

CREATE TABLE locations(
    location_id SERIAL PRIMARY KEY,
    postcode SMALLINT NOT NULL CHECK (postcode > 0),
    name TEXT NOT NULL
);