import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();

mongoose.connection.on('connected', () => {
  console.log(`✅ MongoDB connected to: ${mongoose.connection.name}`);
});
mongoose.connection.on('error', err => {
  console.error(`❌ MongoDB connection error: ${err}`);
});

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000', // Kept for consistency
  'http://localhost:3001', // Added your current frontend origin
  'https://e-commerce-website-zxn0.onrender.com',
  'https://e-commerce-website-frontend.onrender.com',
];

// ✅ Using the cors package for cleaner CORS handling
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // The frontend build folder is expected to be in `../frontend/dist`
  const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
  app.use(express.static(frontendDistPath));

  // For any other request, serve the index.html file
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(frontendDistPath, 'index.html'))
  );
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
