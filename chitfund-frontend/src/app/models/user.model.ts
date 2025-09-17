export interface User {
    _id: string;         // MongoDB ObjectId as string
  name: string;
  address?: string;
  email?: string;
  phone: string;
  pincode?: string;
  password: string;
  username: string;
  role: 'admin' | 'user';
  createdAt?: string;
  updatedAt?: string;
}