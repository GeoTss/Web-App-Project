// IMPORTZ
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const connectDB = require('./config/db.js');
// const { body, validationResult } = require('express-validator');
const errorHandler = require('./middleware/error.handler.middleware.js');

const port = process.env.PORT || 3000;

// Connect to huMONGOus database
connectDB();

// Our app :D 
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Session Middleware
app.use(session({
  name: 'webapp.sid',
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60
  }
}));
// Error Handling Middleware
app.use(errorHandler)

// Api routing
app.use('/api/users', require('./routes/user.routes')); // make complete postman tests for user routes
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api/enrollments', require('./routes/enrollment.routes'));
app.use('/api/resources', require('./routes/resource.routes'));

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
