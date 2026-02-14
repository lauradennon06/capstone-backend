import db from "#db/client";

// Create a new inquiry

export async function createInquiry(name, email, number, message, carId) {
  const sql = `
  INSERT INTO inquiries
    (name, email, number, message, car_id)
  VALUES
    ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const {
    rows: [inquiry],
  } = await db.query(sql, [name, email, number, message, carId]);
  return inquiry;
}

// Get all inquiries

export async function getInquiries() {
  const sql = `
    SELECT inquiries.*, cars.make, cars.model
    FROM inquiries
    LEFT JOIN cars ON inquiries.car_id = cars.id
    `;
  const { rows: inquiries } = await db.query(sql);
  return inquiries;
}

// Get inquiry by ID

export async function getInquiryById(id) {
  const sql = `
    SELECT *
    FROM inquiries
    WHERE id = $1
    `;
  const {
    rows: [inquiry],
  } = await db.query(sql, [id]);
  return inquiry;
}

// Delete inquiry by ID

export async function deleteInquiry(id) {
  const sql = `
    DELETE FROM inquiries
    WHERE id = $1
    `;
  await db.query(sql, [id]);
}
