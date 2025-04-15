const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  try {
    const db = req.app.locals.db;
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, username, email, phone, password: hashedPassword, profilePic: '', coverPic: '' };
    await db.collection('users').insertOne(user);
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = req.app.locals.db;
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ token, user: { name: user.name, email, phone: user.phone } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const user = await db.collection('users').findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ name: user.name, username: user.username, email: user.email, phone: user.phone, profilePic: user.profilePic, coverPic: user.coverPic });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/:email', async (req, res) => {
  const { name, phone, profilePic, coverPic } = req.body;
  try {
    const db = req.app.locals.db;
    await db.collection('users').updateOne(
      { email: req.params.email },
      { $set: { name, phone, profilePic, coverPic } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;