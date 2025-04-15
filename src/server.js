const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    app.locals.db = client.db('tourguide');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
connectDB();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/places', require('./routes/places'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/guides', require('./routes/guides'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/search', require('./routes/search'));

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
// Before app.use('/api/...') lines
console.log('Registering routes...');
const routes = [
  '/api/users', '/api/places', '/api/bookings', '/api/payments',
  '/api/guides', '/api/wishlist', '/api/reviews', '/api/search'
];
routes.forEach(route => {
  console.log(`Loading route: ${route}`);
  app.use(route, require(`./routes${route.split('/api')[1]}`));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));