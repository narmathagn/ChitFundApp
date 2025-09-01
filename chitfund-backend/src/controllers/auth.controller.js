import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { registerSchema, loginSchema } from '../utils/validators.js';

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export async function register(req, res) {
  try {
    const { name, address, email, phone, pincode, username, password } = registerSchema.parse(req.body);

    const exists = await User.findOne({ $or: [{ username: username.toLowerCase() }, { phone }] });
    if (exists) return res.status(409).json({ message: 'Username or phone already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      address,
      email,
      phone,
      pincode,
      username: username.toLowerCase(),
      passwordHash
    });

    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, username: user.username, phone: user.phone, role: user.role }
    });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Validation failed', errors: err.issues });
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { usernameOrPhone, password } = loginSchema.parse(req.body);

    const user = await User.findOne({
      $or: [{ username: usernameOrPhone.toLowerCase() }, { phone: usernameOrPhone }]
    });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, username: user.username, phone: user.phone, role: user.role }
    });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Validation failed', errors: err.issues });
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function me(req, res) {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json({ user });
}
