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

router.get('/', async (req, res) => {
  const { language, maxAge, maxExperience } = req.query;
  try {
    const db = req.app.locals.db;
    const query = {};
    if (language) query.languages = language;
    if (maxAge) query.age = { $lte: parseInt(maxAge) };
    if (maxExperience) query.experience = { $lte: parseInt(maxExperience) };
    const guides = await db.collection('guides').find(query).toArray();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guides' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const guide = await db.collection('guides').findOne({ _id: req.params.id });
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guide' });
  }
});

router.post('/book', verifyToken, async (req, res) => {
  const { userEmail, guideId, date } = req.body;
  if (req.userEmail !== userEmail) return res.status(403).json({ error: 'Unauthorized' });
  try {
    const db = req.app.locals.db;
    const guide = await db.collection('guides').findOne({ _id: guideId });
    if (!guide) return res.status(404).json({ error: 'Guide not found' });

    const booking = {
      _id: Date.now().toString(),
      userEmail,
      guideId,
      date,
      status: 'pending',
      total: 1000 // Fixed price, adjust as needed
    };
    await db.collection('bookings').insertOne(booking);
    res.json({ bookingId: booking._id });
  } catch (error) {
    res.status(500).json({ error: 'Guide booking failed' });
  }
});

module.exports = router;