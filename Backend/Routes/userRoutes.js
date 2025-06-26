const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../Middleware/authMiddleware');
const {getUser} = require('../Controllers/userController');

// Route to get user details
router.get("/", authMiddleware, getUser);

module.exports = router;