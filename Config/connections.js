require("dotenv").config();
const mongoose = require("mongoose");


// MongoDB connection URI
const uri = `mongodb+srv://dhfoijshoijhf:LbPcKj3Q4QR3AjED@ter0.0wqqtg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

module.exports = mongoose.connection;
