import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("users");
    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: err.message });
  }
});

// GET one user by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("users");
    const user = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch user", details: err.message });
  }
});

// CREATE a new user
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const collection = db.collection("users");
    const result = await collection.insertOne(newUser);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create user", details: err.message });
  }
});

// UPDATE a user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = req.body;
    const collection = db.collection("users");

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedUser }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update user", details: err.message });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("users");

    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete user", details: err.message });
  }
});
// POST /users/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const collection = db.collection("users");
  const user = await collection.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid username or password");
  }

  const { password: _, ...userData } = user;

  res.json(userData);
});

export default router;
