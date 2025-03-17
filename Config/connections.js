require("dotenv").config();
const mongoose = require("mongoose");


// MongoDB connection URI
const uri = "mongodb+srv://namanrajpurohit49:LbPcKj3Q4QR3AjED@cluster0.0wqqt.mongodb.net/salonDB?retryWrites=true&w=majority";


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
