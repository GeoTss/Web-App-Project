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
      { 
        username: 'luke',
        email: 'youarenotmydad@xwing.com',
        password: await bcrypt.hash('r2d2', 10),
        preferences: {
          categories: [0, 1, 2, 3],
          difficulties: [0, 1]
        },
        role: 0
      },
      { 
        username: 'anakin',
        email: 'yesiam@deathstar.com',
        password: await bcrypt.hash('useforce', 10),
        preferences: {
          categories: [0, 1, 2],
          difficulties: [0, 1, 3, 4]
        },
        role: 0
      },
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: await bcrypt.hash('admin', 10),
        preferences: {
          categories: [0, 1, 2, 3],
          difficulties: [0, 1]
        },
        role: 1
      }
    ];
    await User.insertMany(users);
    console.log('Stub users inserted successfully.');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
