import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

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

  // Hash password before creating user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let user;
  try {
    user = await User.create({
      name,
      email,
      password: hashedPassword,
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

export {
  registerUser,
};