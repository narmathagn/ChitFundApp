import { User } from '../models/User.js';

export async function listUsers(req, res) {
  const { q = '', page = 1, limit = 10 } = req.query;
  const filter = q
    ? {
        $or: [
          { name: new RegExp(q, 'i') },
          { username: new RegExp(q, 'i') },
          { phone: new RegExp(q, 'i') }
        ]
      }
    : {};
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    User.find(filter).select('-passwordHash').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    User.countDocuments(filter)
  ]);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
}

export async function getUser(req, res) {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user });
}

export async function updateUser(req, res) {
  const { name, address, email, phone, pincode, username, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, address, email, phone, pincode, username: username?.toLowerCase(), role },
    { new: true }
  ).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user });
}

export async function deleteUser(req, res) {
  const out = await User.findByIdAndDelete(req.params.id);
  if (!out) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
}
