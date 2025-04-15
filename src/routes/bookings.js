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

router.post('/', verifyToken, async (req, res) => {
  const { userEmail, placeId, participants, date } = req.body;
  if (req.userEmail !== userEmail) return res.status(403).json({ error: 'Unauthorized' });
  try {
    const db = req.app.locals.db;
    const place = await db.collection('places').findOne({ _id: placeId });
    if (!place) return res.status(404).json({ error: 'Place not found' });

    const booking = {
      _id: Date.now().toString(),
      userEmail,
      placeId,
      participants: { adult: participants.adult || 0, child: participants.child || 0, infant: participants.infant || 0 },
      date,
      status: 'pending',
      total: place.price * (participants.adult + participants.child * 0.5)
    };
    await db.collection('bookings').insertOne(booking);
    res.json({ bookingId: booking._id });
  } catch (error) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

router.get('/:userEmail', verifyToken, async (req, res) => {
  if (req.userEmail !== req.params.userEmail) return res.status(403).json({ error: 'Unauthorized' });
  try {
    const db = req.app.locals.db;
    const bookings = await db.collection('bookings').find({ userEmail: req.params.userEmail }).toArray();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

module.exports = router;