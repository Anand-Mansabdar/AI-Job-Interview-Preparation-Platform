const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @route User Register Controller
 * @description register a new user with username, email and password
 * @access Public
 */
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({
      message: "Username is required",
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  const userExists = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (userExists) {
    if (userExists.username === username) {
      return res.status(400).json({
        message: "User already exists with this Username. Please login.",
      });
    }

    if (userExists.email === email) {
      return res.status(400).json({
        message: "User already exists with this email. Please login.",
      });
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    userDetails: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};

/**
 * @route User Login Controller
 * @description Logging in an existing user with email and password
 * @access Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  const userExists = await userModel.findOne({
    email,
  });

  if (!userExists) {
    return res.status(400).json({
      message: "User does not exist with email. Please register",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, userExists.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    { id: userExists._id, username: userExists.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully",
    userDetails: {
      id: userExists._id,
      username: userExists.username,
      email: userExists.email,
    },
  });
};
module.exports = { registerUser, loginUser };
