import express from 'express';
import Order from '../models/orderModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Save order
router.post('/', protect, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const order = await Order.create({
      userId: req.user._id,
      items,
      totalAmount,
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Order creation failed' });
  }
});

// Get user orders
router.get('/', protect, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
});

export default router;
