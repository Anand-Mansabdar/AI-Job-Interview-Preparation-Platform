const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

router.post("/register", registerUser);
/**
 * @route POST /api/auth/login
 * @description Login an existing user with email and password
 * @access Public
 */
router.post("/login", loginUser);

module.exports = router;
