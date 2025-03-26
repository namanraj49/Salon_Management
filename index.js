const express = require("express");
const path = require("path");
const db = require("./Config/connections");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config(); // Load environment variables

const app = require("./app"); // Importing Express app
const server = http.createServer(app); // Create HTTP server

// Initialize Socket.io
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Initialize session
app.use(
    session({
        secret: process.env.JWT_KEY || "default_secret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 3600000 },
    })
);

// Attach io to req object for controllers
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log(`🔌 A user connected: ${socket.id}`);

  // 🔹 Listen for user joining (customer/barber)
  socket.on("join", ({ userId, userType }) => {
      if (userType === "barber") {
          socket.join(`barber-${userId}`);
      } else {
          socket.join(`customer-${userId}`);
      }
      console.log(`✅ ${userType} joined room: ${userId}`);
  });

  // 🔹 Listen for slot booking
  socket.on("bookSlot", (data) => {
      console.log("📅 Slot booked:", data);
      // Notify the barber of the new booking
      io.to(`barber-${data.barberId}`).emit("appointment_request", {
          slotId: data.slotId,
          customerId: data.customerId,
          message: "New appointment request!",
      });
  });

  // 🔹 Listen for appointment status update
  socket.on("updateAppointmentStatus", (data) => {
      console.log("🔄 Appointment status updated:", data);
      // Notify the customer
      io.to(`customer-${data.customerId}`).emit("appointment_update", {
          slotId: data.slotId,
          status: data.status,
          message: `Your appointment has been ${data.status}.`,
      });
  });

  // 🔹 Handle disconnect
  socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Basic route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
