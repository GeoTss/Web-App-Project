const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    req.session.user = {
      _id: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email,
    };

    res.status(201).json({ message: 'User registered successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    res.json({ message: 'Login successful' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('webapp.sid');
    res.json({ message: 'Logged out' });
  });
};

// Current user
exports.getCurrentUser = (req, res) => {
  res.json(req.session.user);
};
