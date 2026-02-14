import express from "express";
const router = express.Router();

import {
  createCar,
  getCarById,
  getCars,
  updateCar,
  deleteCar,
  getCarPhotos,
} from "#db/queries/cars";

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router.get("/", async (req, res) => {
  const cars = await getCars();
  res.send(cars);
});

router.get("/:id", async (req, res) => {
  const car = await getCarById(req.params.id);
  if (!car) return res.status(404).send("Car not found");
  res.send(car);
});

router.get("/:id/photos", async (req, res, next) => {
  try {
    const photos = await getCarPhotos(req.params.id);
    res.send(photos);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/",
  requireUser,
  requireBody([
    "make",
    "model",
    "year",
    "mileage",
    "vin",
    "price",
    "color",
    "photoUrl",
  ]),
  async (req, res) => {
    const car = await createCar(req.body);
    res.status(201).send(car);
  },
);

router.put(
  "/:id",
  requireUser,
  requireBody([
    "make",
    "model",
    "year",
    "mileage",
    "vin",
    "price",
    "color",
    "photoUrl",
  ]),
  async (req, res) => {
    const car = await updateCar(req.params.id, req.body);
    res.send(car);
  },
);

router.delete("/:id", requireUser, async (req, res) => {
  await deleteCar(req.params.id);
  res.status(204).send();
});

export default router;
