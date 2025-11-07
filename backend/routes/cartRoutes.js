import express from 'express';
const router = express.Router();
import {
  getCart,
  addOrUpdateCartItem,
  removeCartItem,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getCart).post(protect, addOrUpdateCartItem);
router.route('/:productId').delete(protect, removeCartItem);

export default router;
