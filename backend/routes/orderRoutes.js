import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { items, totalAmount } = req.body; // items should be an array from the cart
    if (!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Missing or invalid order data" });
    }

    const order = new Order({
      user: req.user._id, // Get userId from the authenticated user
      items,
      totalAmount,
    });

    const createdOrder = await order.save();
    console.log(`[INFO] Order saved: { id: ${createdOrder._id} }`);
    res.status(201).json({ message: "Order placed successfully", order: createdOrder });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
});

// GET /api/orders/view (Debug Route)
router.get('/view', async (req, res) => {
  // Simple protection for a debug route
  if (process.env.DEBUG_VIEW_KEY && req.headers['x-debug-key'] !== process.env.DEBUG_VIEW_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid or missing debug key.' });
  }
  try {
    const orders = await Order.find().sort({ date: -1 }).limit(20);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching orders", error });
  }
});

export default router;