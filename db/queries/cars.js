import db from "#db/client";

// Create a new car in the database
export async function createCar(
  make,
  model,
  year,
  mileage,
  vin,
  price,
  color,
  photoUrl,
) {
  const sql = `
    INSERT INTO cars
        (make, model, year, mileage, vin, price, color, photo_url)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `;
  const {
    rows: [car],
  } = await db.query(sql, [
    make,
    model,
    year,
    mileage,
    vin,
    price,
    color,
    photoUrl,
  ]);
  return car;
}

// Retrieve all cars from the database
export async function getCars() {
  const sql = `
    SELECT *
    FROM cars
    `;
  const { rows: cars } = await db.query(sql);
  return cars;
}

// Retrieve a car by its ID
export async function getCarById(id) {
  const sql = `
    SELECT *
    FROM cars
    WHERE id = $1
    `;
  const {
    rows: [car],
  } = await db.query(sql, [id]);
  return car;
}

// Update a car's details
export async function updateCar(
  id,
  make,
  model,
  year,
  mileage,
  vin,
  price,
  color,
  photoUrl,
) {
  const sql = `
    UPDATE cars
    SET make = $1,
        model = $2,
        year = $3,
        mileage = $4,
        vin = $5,
        price = $6,
        color = $7,
        photo_url = $8
    WHERE id = $9
    RETURNING *
    `;
  const {
    rows: [car],
  } = await db.query(sql, [
    make,
    model,
    year,
    mileage,
    vin,
    price,
    color,
    photoUrl,
    id,
  ]);
  return car;
}

// Delete a car from the database
export async function deleteCar(id) {
  const sql = `
    DELETE FROM cars
    WHERE id = $1
    `;
  await db.query(sql, [id]);
}
