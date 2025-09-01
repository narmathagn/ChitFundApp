import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  address: z.string().optional().default(''),
  email: z.string().email().optional(),
  phone: z.string().min(8),
  pincode: z.string().optional(),
  username: z.string().min(3),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  usernameOrPhone: z.string().min(3),
  password: z.string().min(6)
});
