const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtimeController');
router.post('/', showtimeController.addShowtime);
router.get('/', showtimeController.getShowtimes);
module.exports = router;