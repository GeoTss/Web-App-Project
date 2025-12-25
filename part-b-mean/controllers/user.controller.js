const User = require('../models/user.model');
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

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
