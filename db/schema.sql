DROP TABLE IF EXISTS inquiries;
DROP TABLE IF EXISTS car_photos;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS auctions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE auctions (
  id serial PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  icon_url text NOT NULL
);

CREATE TABLE cars (
  id serial PRIMARY KEY,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  mileage integer NOT NULL,
  vin text NOT NULL,
  price integer NOT NULL,
  color text NOT NULL,
  photo_url text NOT NULL
);

CREATE TABLE car_photos (
  id serial PRIMARY KEY,
  car_id integer NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  file_path text NOT NULL
);

CREATE TABLE inquiries (
id serial PRIMARY KEY,
name text NOT NULL,
email text NOT NULL,
number text NOT NULL,
message text NOT NULL,
car_id integer NULL REFERENCES cars(id) ON DELETE SET NULL
);