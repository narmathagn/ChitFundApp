import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },            // Plan Name
    duration: { type: Number, required: true },        // Plan Duration (in months or days)
    fixedAmount: { type: Number, required: true },     // Fixed Amount
    description: { type: String },                     // Plan Description
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
