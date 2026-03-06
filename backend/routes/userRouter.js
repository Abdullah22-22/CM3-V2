const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userController');

// POST /api/login
router.post('/login', loginUser);

// POST /api/register
router.post('/register', registerUser);

module.exports = router;
