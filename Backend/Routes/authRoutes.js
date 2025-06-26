const express = require('express');
const { login, signup, forgotPassword, resetPassword, verifyToken } = require('../Controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/register', signup);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('verify-reset-token/:token',verifyToken)

module.exports = router;