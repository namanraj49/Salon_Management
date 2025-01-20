const express = require("express");
const path = require("path");
const app = express();
const db = require("./Config/connections");
const cookieparser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config(); // For loading environment variables

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
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
app.use("/", function (req, res) {
  res.send("Hello, world!");
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
