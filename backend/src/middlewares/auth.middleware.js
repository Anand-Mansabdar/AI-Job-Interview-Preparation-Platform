const jwt = require("jsonwebtoken");

const blacklistModel = require("../models/tokenBlacklist.model");
const userAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized User",
    });
  }

  const isBlacklisted = await blacklistModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    // console.log(decoded);
    // console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = { userAuthMiddleware };
