const User = require('../models/user.model');
const bcrypt = require('bcrypt');


// Register Controller
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  
  const existingUser = await User.findOne({ $or: [ { username }, { email } ] });
  
  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
}

// Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username : username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({
    message: 'Login successful',
    user: {
      username: user.username,
      email: user.email,
    },
  });
};
