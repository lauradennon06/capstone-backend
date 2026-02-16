import express from "express";
import multer from "multer";
const app = express();
export default app;

import usersRouter from "#api/users";
import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";
import cors from "cors";
import morgan from "morgan";
import auctionsRouter from "#api/auctions";
import carsRouter from "#api/cars";
import inquiriesRouter from "#api/inquiries";
import { saveCarPhoto } from "#db/queries/cars";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

app.use(getUserFromToken);

app.post("/upload", upload.array("files", 10), async (req, res) => {
  try {
    const carId = req.body.carId;

    if (!carId) {
      return res.status(400).send("carId is required");
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const savedPhotos = await Promise.all(
      req.files.map((file) => saveCarPhoto(carId, file.path)),
    );
    res.send("Files uploaded and saved successfully");
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Error uploading files");
  }
});

app.use("/users", usersRouter);

app.use("/auctions", auctionsRouter);

app.use("/cars", carsRouter);

app.use("/inquiries", inquiriesRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
