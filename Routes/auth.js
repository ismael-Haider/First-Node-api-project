const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// register a new user
router.post("/register", registerUser);

// login existing user
router.post("/login", loginUser);

module.exports = router;