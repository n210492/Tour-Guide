const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/:placeId', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const reviews = await db.collection('reviews').find({ placeId: req.params.placeId }).toArray();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  const { userEmail, placeId, rating, comment } = req.body;
  if (req.userEmail !== userEmail) return res.status(403).json({ error: 'Unauthorized' });
  try {
    const db = req.app.locals.db;
    const review = { userEmail, placeId, rating, comment, date: new Date() };
    await db.collection('reviews').insertOne(review);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

module.exports = router;