const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const User = require('./models/user.model.js');
const path = require('path');
//  I LOVE HARDCODING CREDENTIALS IN MY CODE LOL
const uname = "AuebHustler2025";
const pwd = "AUebHust13r%3F";
const uri = `mongodb+srv://${uname}:${pwd}@webappprojectaueb.ms7f1ey.mongodb.net/?appName=WebAppProjectAueb`;

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Absolute path to part-a-frontend
const frontendPath = path.join(__dirname, '..', 'part-a-frontend');

// Serve frontend
app.use(express.static(frontendPath));

// Handle frontend routes
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});


// DB Connection Setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);