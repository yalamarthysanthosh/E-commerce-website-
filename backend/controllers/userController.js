import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  let user;
  try {
    // Pass the plain password directly. The pre-save hook in the model will hash it.
    user = await User.create({
      name,
      email,
      password, // Plain password
    });
  } catch (error) {
    console.error('Error on user creation:', error);
    res.status(500);
    // It's good practice to check for validation errors specifically
    if (error.name === 'ValidationError') {
      res.status(400);
    }
    throw new Error('Could not create user. ' + error.message);
  }

  if (user) {
    // You would generate a token here and send it back
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export { registerUser };