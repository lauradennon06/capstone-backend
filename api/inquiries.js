import express from "express";
const router = express.Router();

import { createInquiry, deleteInquiry } from "#db/queries/inquiries";

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router.post(
  "/",
  requireBody(["name", "email", "number", "message", "carId"]),
  async (req, res) => {
    const { name, email, number, message, carId } = req.body;
    const inquiry = await createInquiry(name, email, number, message, carId);
    res.status(201).send(inquiry);
  },
);

router.delete("/:id", requireUser, async (req, res) => {
  await deleteInquiry(req.params.id);
  res.status(204).send();
});

export default router;
