require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');

async function seed() {
  try {
    const uname = process.env.MONGO_USERNAME;
    const pwd = process.env.MONGO_PASSWORD;
    const uri = `mongodb+srv://${uname}:${encodeURIComponent(pwd)}@webappprojectaueb.ms7f1ey.mongodb.net/?appName=WebAppProjectAueb`;  

    await mongoose.connect(uri);
    await User.deleteMany({});

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
}

seed();
