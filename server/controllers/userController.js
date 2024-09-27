import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Record from '../models/recordModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc: display all the users
// @route: GET /api/users
// @access: Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (req.user.role === 'admin') {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error('Not authorized');
  }
});

// @desc: register a user
// @route: POST /api/users
// @access: Public
const addUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc: login a user
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for the user
  const user = await User.findOne({ email });

  // check password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc: get a user
// @route: GET /api/users/me
// @access: Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc: delete a user
// @route: GET /api/users/:id
// @access: Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const records = await Record.find({ user: user._id });

  // check if the user exists
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  try {
    // delete associated collections
    await Record.deleteMany({ user: user._id });
    await user.deleteOne();

    res.status(200).json({
      message: 'Successfully deleted',
      user,
      records,
    });
  } catch (err) {
    res.status(500);
    throw new Error('User deletion failed');
  }
});

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export { getUsers, addUser, loginUser, getUser, deleteUser };
