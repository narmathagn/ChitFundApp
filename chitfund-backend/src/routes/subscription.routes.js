import express from "express";
const router = express.Router();
import Subscription from '../models/Subscription.js';
import Plan from "../models/Plan.js";
import User from "../models/User.js";

// ✅ Create subscription
router.post('/create', async (req, res) => {
  try {
    const { userId, planId, totalAmountPaid, status, totalGramsEarned, planStartDate, planEndDate } = req.body;

    const subscription = new Subscription({
      userId,
      planId,
      totalAmountPaid,
      status,
      totalGramsEarned,
      planStartDate,
      planEndDate,
    });

    await subscription.save();
    res.status(201).json({ success: true, subscription });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ Get all subscriptions
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('userId', 'username email phoneNumber')
      .populate('planId', 'planName planDuration fixedAmount');
    res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get subscriptions by UserId
router.get('/user/:userId', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId })
      .populate('planId', 'planName planDuration fixedAmount');
    res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Update subscription by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, subscription: updatedSubscription });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
// ✅ Get subscriptions by PlanId
router.get('/plan/:planId', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ planId: req.params.planId })
      .populate('userId', 'username email phoneNumber')
      .populate('planId', 'planName planDuration fixedAmount');
    res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get subscriptions by Status
router.get('/status/:status', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ status: req.params.status })
      .populate('userId', 'username email phoneNumber')
      .populate('planId', 'planName planDuration fixedAmount');
    res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// ✅ Delete subscription by ID
router.delete('/:id', async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
