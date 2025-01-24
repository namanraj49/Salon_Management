const express = require("express");
const userRouter = require("./routes/user.routes.js");
const cors = require('cors');
const app = express();

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3001',  // Allow frontend from localhost:3001
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    credentials: true  // Allow credentials like cookies if needed
  }));
// Routes
app.use("/users", userRouter);

module.exports = app;
