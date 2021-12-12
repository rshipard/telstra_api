CREATE DATABASE telstra_vehicles;

-- \c telstra_vehicles

-- only used for testing, left in for transparency
-- CREATE TABLE testing(
--     test_id SERIAL PRIMARY KEY,
--     description VARCHAR(255)
-- );

-- This table assumes all cars are registered, and would need to be modified if that were not the case, or a seperate table established for unregistered cars (which could leading to cars ending up on both tables. Once again multiple checks need to be performed PRIOR to entering data into the DB)
CREATE TABLE cars(
    car_id SERIAL PRIMARY KEY,
    registration_number VARCHAR(10) NOT NULL UNIQUE,
    year SMALLINT NOT NULL CHECK (year > 1800),
    color TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    postcode SMALLINT NOT NULL CHECK (postcode > 0)
);

-- one location table can be shared across multiple vehicles as a reference
-- considered making the postcode or location name unique to avoid accidentally doubling up on the DB, but both of these can be used acress multiple area. This would need to be handled by further error checking PRIOR to entering the DB
CREATE TABLE locations(
    location_id SERIAL PRIMARY KEY,
    postcode SMALLINT NOT NULL CHECK (postcode > 0),
    name TEXT NOT NULL
);