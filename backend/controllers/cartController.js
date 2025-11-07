import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'items.product',
    'name price image'
  );
  if (cart) {
    res.json(cart);
  } else {
    // If no cart, create an empty one for the user
    const newCart = await Cart.create({ user: req.user._id, items: [] });
    res.json(newCart);
  }
});

// @desc    Add or update item in cart
// @route   POST /api/cart
// @access  Private
const addOrUpdateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (p) => p.product.toString() === productId
  );

  if (itemIndex > -1) {
    // Product exists in the cart, update the quantity
    let productItem = cart.items[itemIndex];
    productItem.quantity = quantity;
    cart.items[itemIndex] = productItem;
  } else {
    // Product does not exist in cart, add new item
    cart.items.push({ product: productId, quantity });
  }
  
  const updatedCart = await cart.save();
  await updatedCart.populate('items.product', 'name price image');
  res.status(201).json(updatedCart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });

  if (cart) {
    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    if (cart.items.length < initialLength) {
      await cart.save();
      res.json({ message: 'Item removed' });
    } else {
      res.status(404);
      throw new Error('Item not found in cart');
    }
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

export { getCart, addOrUpdateCartItem, removeCartItem };
