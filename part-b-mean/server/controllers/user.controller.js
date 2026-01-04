const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Register
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, preferences } = req.body;

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
      preferences
    });

    req.session.user = {
      _id: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email,
      preferences: newUser.preferences,
      isAdmin: newUser.isAdmin
    };

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      preferences: user.preferences,
      isAdmin: user.isAdmin
    };

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

// Logout
exports.logout = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }
    res.clearCookie('webapp.sid');
    res.status(200).json({ message: 'Logged out' });
  });
};

// Current user
exports.getCurrentUser = (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    res.status(200).json(req.session.user);
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { username, email, password, preferences } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    if (preferences) updateData.preferences = preferences;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    req.session.user.email = updatedUser.email;

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.session.user._id;

    await User.findByIdAndDelete(userId);

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }
      res.clearCookie('webapp.sid');
      res.status(200).json({ message: 'User deleted successfully' });
    });
  } catch (error) {
    next(error);
  }
};
