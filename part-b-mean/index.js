// IMPORTZ
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model.js');
const path = require('path');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');


// CONFIGZ
const port = process.env.PORT || 3000;
const uname = process.env.MONGO_USERNAME;
const pwd = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${uname}:${encodeURIComponent(pwd)}@webappprojectaueb.ms7f1ey.mongodb.net/?appName=WebAppProjectAueb`;  

// MONGOL-OS CONNECT
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log('Mongo is running on roids!');
})
.catch(err => {
  console.error('Mongo connect failed:', err);
  process.exit(1);
});

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
    mongoUrl: uri,
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60
  }
}));

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}


// Absolute path to part-a-frontend
const frontendPath = path.join(__dirname, '..', 'part-a-frontend');

// Api routing
app.use('/api/users', require('./routes/user.routes'));

// Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(frontendPath, 'register.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(frontendPath, 'about.html'));
});

app.get('/books-videos', (req, res) => {
  res.sendFile(path.join(frontendPath, 'books.html'));
});

app.get('/courses', (req, res) => {
  res.sendFile(path.join(frontendPath, 'courses.html'));
});

app.get('/profile', requireAuth, (req, res) => {
  res.json(req.session.user);
});

// Static Files
app.use(express.static(frontendPath));
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


