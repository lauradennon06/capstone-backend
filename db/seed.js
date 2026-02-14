import db from "#db/client";
import { createUser } from "#db/queries/users";
import { fa, faker } from "@faker-js/faker";
import { createCar } from "#db/queries/cars";
import { createInquiry } from "#db/queries/inquiries";
import { createAuction } from "#db/queries/auctions";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Create one admin user that will have acces to log in and manage the site
  await createUser({
    email: "hector_marte24@hotmail.com",
    password: "Admin123!",
  });

  // create 5 cars using faker with id, make, model, year, mileage, vin, price, color, and photo_url
  const cars = [];
  for (let i = 0; i < 5; i++) {
    const car = await createCar(
      faker.vehicle.manufacturer(),
      faker.vehicle.model(),
      faker.number.int({ min: 2000, max: 2024 }),
      faker.number.int({ min: 0, max: 200000 }),
      faker.vehicle.vin(),
      faker.number.int({ min: 5000, max: 50000 }),
      faker.color.human(),
      faker.image.url({
        width: 640,
        height: 480,
        category: "transportation",
      }),
    );
    cars.push(car);
  }

  // create 10 inquiries for random cars
  for (let j = 0; j < 10; j++) {
    const randomCar = cars[faker.number.int({ min: 0, max: cars.length - 1 })];
    await createInquiry(
      faker.person.fullName(),
      faker.internet.email(),
      faker.phone.number(),
      faker.lorem.sentence(),
      randomCar.id,
    );
  }

  // create 2 auction sites with name, url, icon_url
  await createAuction(
    "Copart",
    "https://www.copart.com",
    "https://www.copart.com/favicon.ico",
  );

  await createAuction(
    "IAAI",
    "https://www.iaai.com",
    "https://www.iaai.com/favicon.ico",
  );
}
