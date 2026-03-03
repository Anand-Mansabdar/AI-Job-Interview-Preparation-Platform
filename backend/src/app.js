// Packages
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Instances
const app = express();

// Routes
const authRouter = require("./routes/auth.routes");

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routing
app.use("/api/auth", authRouter);

module.exports = app;
