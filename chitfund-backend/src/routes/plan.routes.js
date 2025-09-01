import express from "express";
const router = express.Router();
import Plan from "../models/Plan.js";

// Create a new plan
router.post('/create', async (req, res) => {
  try {
    const { name, duration, fixedAmount, description  } = req.body;
    const plan = new Plan({ name, duration, fixedAmount, description });
    await plan.save();
    res.status(201).json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a plan by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, plan: updatedPlan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete a plan by ID
router.delete('/:id', async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
