const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller");

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

/**
 * @route GET /api/auth/logout
 * @description Log out the user and clear cookie and blacklist the token
 * @access Public
 */
router.get("/logout", logoutUser);

module.exports = router;
