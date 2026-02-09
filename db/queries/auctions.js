import db from "#db/client";

// create a auction in the database

export async function createAuction(name, url, icon_url) {
  const sql = `
    INSERT INTO auctions
        (name, url, icon_url)
    VALUES
        ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [auction],
  } = await db.query(sql, [name, url, icon_url]);
  return auction;
}

// get all auctions from the database

export async function getAuctions() {
  const sql = `
    SELECT *
    FROM auctions
    `;
  const { rows: auctions } = await db.query(sql);
  return auctions;
}

// get auction by id from the database

export async function getAuctionById(id) {
  const sql = `
    SELECT *
    FROM auctions
    WHERE id = $1
    `;
  const {
    rows: [auction],
  } = await db.query(sql, [id]);
  return auction;
}

// update a auction in the database

export async function updateAuction(id, { name, url, icon_url }) {
  const sql = `
    UPDATE auctions
    SET name = $1,
        url = $2,
        icon_url = $3
    WHERE id = $4
    RETURNING *
    `;
  const {
    rows: [auction],
  } = await db.query(sql, [name, url, icon_url, id]);
  return auction;
}

// delete a auction from the database

export async function deleteAuction(id) {
  const sql = `
    DELETE FROM auctions
    WHERE id = $1
    `;
  await db.query(sql, [id]);
}
