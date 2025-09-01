import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  totalAmountPaid: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'Closed', 'overdue'],
    default: 'active',
  },
  totalGramsEarned: {
    type: Number,
    default: 0,
    set: v => Number(v.toFixed(3)) // round to 3 decimal places
  },
  planStartDate: {
    type: Date,
    default: Date.now,
  },
  planEndDate: {
    type: Date,
  },
  remainingMonths:{
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
