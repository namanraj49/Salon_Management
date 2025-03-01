const express = require("express");
const userRouter = require("./routes/user.routes.js");
const cors = require('cors');
const app = express();

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const allowedOrigins = ['http://localhost:3001', 'http://localhost:8081'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));



app.use("/users", userRouter);

module.exports = app;
