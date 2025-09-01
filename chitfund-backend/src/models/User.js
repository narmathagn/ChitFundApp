import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },        // Customer Name
    address: { type: String, default: '' },                    // Customer Address
    email: { type: String, trim: true, lowercase: true },      // Customer email id
    phone: { type: String, required: true, unique: true },     // Customer Phone Number
    pincode: { type: String, default: '' },                    // Customer Pin code
    username: { type: String, required: true, unique: true, lowercase: true, trim: true }, // username
    passwordHash: { type: String, required: true },            // Password (hashed)
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
  },
  { timestamps: true }
);

// email can be optional but unique when present
const User = mongoose.model("User", userSchema);
export default User;