const mongoose = require("mongoose");

// Hard-coded password
const password = "dIa1b3ud1qeHrjrh";

// MongoDB connection URI
const uri = `mongodb+srv://namanrajpurohit49:${password}@cluster0.scgpi.mongodb.net/?retryWrites=true&w=majority`;

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
