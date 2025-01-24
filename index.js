const express = require("express");
const path = require("path");
const db = require("./Config/connections");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config(); // For loading environment variables

const app = require("./app"); // Importing app from app.js

// Middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Initialize session
app.use(
  session({
    secret: process.env.JWT_KEY, // Session secret key
    resave: false, // Prevents session being saved repeatedly when not modified
    saveUninitialized: false, // Doesn't create empty sessions for unauthenticated users
    cookie: { secure: false, maxAge: 3600000 }, // Configuring session cookie
  })
);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
