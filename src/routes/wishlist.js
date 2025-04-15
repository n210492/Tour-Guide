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

router.get('/:userEmail', verifyToken, async (req, res) => {
  if (req.userEmail !== req.params.userEmail) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const db = req.app.locals.db;
    const wishlist = await db.collection('wishlist').find({ userEmail: req.params.userEmail }).toArray();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

router.post('/:userEmail', verifyToken, async (req, res) => {
  if (req.userEmail !== req.params.userEmail) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  const { placeId } = req.body;
  try {
    const db = req.app.locals.db;
    const place = await db.collection('places').findOne({ _id: placeId });
    if (!place) return res.status(404).json({ error: 'Place not found' });

    const existing = await db.collection('wishlist').findOne({ userEmail: req.params.userEmail, placeId });
    if (existing) return res.status(400).json({ error: 'Already in wishlist' });

    await db.collection('wishlist').insertOne({ userEmail: req.params.userEmail, placeId, name: place.name, image: place.image });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

router.delete('/:userEmail', verifyToken, async (req, res) => {
  if (req.userEmail !== req.params.userEmail) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  const { placeId } = req.body;
  try {
    const db = req.app.locals.db;
    await db.collection('wishlist').deleteOne({ userEmail: req.params.userEmail, placeId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

module.exports = router;