const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const { city } = req.query;
  try {
    const db = req.app.locals.db;
    const query = city ? { city } : {};
    const places = await db.collection('places').find(query).toArray();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const place = await db.collection('places').findOne({ _id: req.params.id });
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch place' });
  }
});

module.exports = router;