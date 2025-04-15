const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const { query } = req.query;
  try {
    const db = req.app.locals.db;
    const places = await db.collection('places').find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } }
      ]
    }).toArray();
    const guides = await db.collection('guides').find({ name: { $regex: query, $options: 'i' } }).toArray();
    res.json({ places, guides });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;