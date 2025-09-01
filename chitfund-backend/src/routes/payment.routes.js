import express from 'express';
import Payment from '../models/Payment.js';
import { createPayment } from '../controllers/payment.controller.js';

const router = express.Router();

// ✅ Create Payment
router.post('/createpayment', createPayment);

// ✅ Get all payments
router.get('/getAllPayments', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'username email phoneNumber')
      .populate('subscriptionId', 'planId status totalAmountPaid');
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get payments by UserId
router.get('/user/:userId', async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId })
      .populate('subscriptionId', 'planId status totalAmountPaid');
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get payments by SubscriptionId
router.get('/subscription/:subscriptionId', async (req, res) => {
  try {
    const payments = await Payment.find({ subscriptionId: req.params.subscriptionId })
      .populate('userId', 'username email phoneNumber');
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Update payment by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, payment: updatedPayment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ Get payments by Status
router.get('/status/:status', async (req, res) => {
  try {
    const { status } = req.params;

    const payments = await Payment.find({ paymentStatus: status })
      .populate('userId', 'username email phoneNumber')
      .populate('subscriptionId', 'planId status totalAmountPaid');

    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// ✅ Delete payment by ID
router.delete('/:id', async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
