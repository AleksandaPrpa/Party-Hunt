import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all parties
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("parties");
    const parties = await collection.find({}).toArray();
    res.json(parties);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch parties", details: err.message });
  }
});

// GET one party by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("parties");
    const party = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!party) return res.status(404).json({ error: "Party not found" });

    res.json(party);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch party", details: err.message });
  }
});

// CREATE a new party
router.post("/", async (req, res) => {
  try {
    const newParty = req.body;
    const collection = db.collection("parties");
    const result = await collection.insertOne(newParty);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create party", details: err.message });
  }
});

// UPDATE an existing party
router.put("/:id", async (req, res) => {
  try {
    const updatedParty = req.body;
    const collection = db.collection("parties");

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedParty }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Party not found" });

    res.json({ message: "Party updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update party", details: err.message });
  }
});

// DELETE a party
router.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("parties");

    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Party not found" });

    res.json({ message: "Party deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete party", details: err.message });
  }
});

export default router;
