import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create new user
router.post("/", async (req, res) => {
  try {
    const { name, address, email, phone, pincode, username, password } = req.body;
    const newUser = new User({
      name,
      address,
      email,
      phone,
      pincode,
      username,
      passwordHash: password, // ⚠️ later hash this
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // contains fields to update
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
