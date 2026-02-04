import express from "express";
const router = express.Router();

import { createCar, getCarById, getCars } from "#db/queries/cars";

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router.use(requireUser);
