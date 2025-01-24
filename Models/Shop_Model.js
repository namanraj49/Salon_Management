const mongoose = require('mongoose');

// Define the schema for Shop
const shopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    ownerName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    shopImage: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Export the Shop model based on the shopSchema
module.exports = mongoose.model('Shop', shopSchema);
