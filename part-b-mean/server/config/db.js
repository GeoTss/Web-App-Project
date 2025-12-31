const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

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
