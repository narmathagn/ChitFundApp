// src/server.js
import dotenv from 'dotenv';
dotenv.config(); // must come before anything that uses process.env

console.log('Current working directory:', process.cwd());
console.log('MONGO_URI:', process.env.MONGO_URI);

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
connectDB(); 
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import planRoutes from './routes/plan.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import paymentRoutes from './routes/payment.routes.js';


const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);

// Debug .env
console.log('MONGO_URI:', process.env.MONGO_URI);


// Connect DB and start server
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 API running at http://localhost:${PORT}`)
  );
});
