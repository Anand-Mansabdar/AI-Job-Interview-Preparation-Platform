// Packages
const express = require("express");
const cookieParser = require("cookie-parser");

// Instances
const app = express();

// Routes
const authRouter = require("./routes/auth.routes");

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routing
app.use("/api/auth", authRouter);

module.exports = app;
