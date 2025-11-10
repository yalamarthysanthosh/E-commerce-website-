import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity } = req.body;

  const user = await User.findById(req.user._id);
  const product = await Product.findById(productId);

  if (user && product) {
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId && item.color === color
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, color, quantity });
    }

    await user.save();
    // Populate product details before sending back the cart
    const populatedCart = await user.populate('cart.product');
    res.status(200).json(populatedCart.cart);
  } else {
    res.status(404);
    throw new Error('User or Product not found');
  }
});

export {
  addToCart,
};