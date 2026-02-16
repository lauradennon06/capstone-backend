import express from "express";
const router = express.Router();

import {
  createAuction,
  getAuctionById,
  getAuctions,
  updateAuction,
  deleteAuction,
} from "#db/queries/auctions";

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router.get("/", async (req, res) => {
  const auctions = await getAuctions();
  res.send(auctions);
});

router.get("/:id", async (req, res) => {
  const auction = await getAuctionById(req.params.id);
  if (!auction) return res.status(404).send("Auction not found");
  res.send(auction);
});

router.post(
  "/",
  requireUser,
  requireBody(["name", "url", "icon_url"]),
  async (req, res) => {
    const auction = await createAuction(
      req.body.name,
      req.body.url,
      req.body.icon_url,
    );
    res.status(201).send(auction);
  },
);

router.put(
  "/:id",
  requireUser,
  requireBody(["name", "url", "icon_url"]),
  async (req, res) => {
    const auction = await updateAuction(req.params.id, req.body);
    res.send(auction);
  },
);

router.delete("/:id", requireUser, async (req, res) => {
  await deleteAuction(req.params.id);
  res.status(204).send();
});

export default router;
