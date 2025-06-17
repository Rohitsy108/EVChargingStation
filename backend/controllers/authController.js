import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res, next) => {
  try {
    const { username, phone, password } = req.body;

    // Check for existing username or phone
    const existingUser = await User.findOne({
      $or: [{ username }, { phone }]
    });

    if (existingUser) {
      const field = existingUser.username === username ? 'Username' : 'Phone number';
      return res.status(400).json({ message: `${field} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      phone,
      password: hashedPassword
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin, // <-- FIXED: use actual value
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};

