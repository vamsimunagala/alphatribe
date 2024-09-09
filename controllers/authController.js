const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../config/jwt');

// Register user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = generateToken(user._id);
    res.cookie('token', token);
    res.redirect('/dashboard');
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
