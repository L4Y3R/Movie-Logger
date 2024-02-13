const express = require("express");
const router = express.Router();

const { loginUser, signupUser } = require("../controllers/userController");

// Login route
router.post("/login", loginUser);

// Sign Up route
router.post("/signup", signupUser);

module.exports = router;
