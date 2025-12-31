const mongoose = require('mongoose');

const uname = process.env.MONGO_USERNAME;
const pwd = process.env.MONGO_PASSWORD;
const uri = process.env.MONGO_URI || `mongodb+srv://${uname}:${encodeURIComponent(pwd)}@webappprojectaueb.ms7f1ey.mongodb.net/?appName=WebAppProjectAueb`;  

async function connectDB() {

    if (!uri) {
        throw new Error('MONGO_URI not defined');
    }

    try {
        await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000,
        });
        console.log('MongoDB is running on roids');
    } catch (err) {
        console.error('MongoDB connection failed');
        process.exit(1);
    }
}

module.exports = connectDB;
