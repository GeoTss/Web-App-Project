require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const connectDB = require('../config/db.js');

(async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    console.log('Old users removed');
    const users = [
      { username: 'BigTso', email: 'roids@auebhustler.com', password: await bcrypt.hash('nosecurity', 10) },
      { username: 'Toto', email: 'toto@auebhustler.com', password: await bcrypt.hash('roidrageforthewin', 10) },
    ];
    await User.insertMany(users);
    console.log('Stub users inserted successfully.');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
