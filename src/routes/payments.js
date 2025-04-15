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
  const { bookingId, method } = req.body;
  try {
    const db = req.app.locals.db;
    const booking = await db.collection('bookings').findOne({ _id: bookingId, userEmail: req.userEmail });
    if (!booking) return res.status(404).json({ error: 'Booking not found or unauthorized' });

    const success = Math.random() > 0.3; // Mock 70% success
    const payment = {
      _id: Date.now().toString(),
      bookingId,
      userEmail: req.userEmail,
      method,
      amount: booking.total,
      status: success ? 'success' : 'failed',
      date: new Date()
    };
    await db.collection('payments').insertOne(payment);
    await db.collection('bookings').updateOne(
      { _id: bookingId },
      { $set: { status: success ? 'confirmed' : 'failed' } }
    );
    res.json({ success, redirect: success ? '/payment-successful.html' : '/payment-failed.html' });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed' });
  }
});

module.exports = router;