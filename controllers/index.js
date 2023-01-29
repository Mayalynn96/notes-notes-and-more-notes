const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

const notesRoute = require('../controllers/notesController');
router.use('/api/notes', notesRoute)

module.exports = router;