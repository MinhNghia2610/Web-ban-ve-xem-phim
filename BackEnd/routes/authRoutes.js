const express = require('express');
const router = express.Router();

// Route mẫu
router.post('/login', (req, res) => {
    res.json({ message: 'Login success' });
});

router.post('/register', (req, res) => {
    res.json({ message: 'Register success' });
});

module.exports = router;
