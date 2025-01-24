const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'barber', 'employee'],
      default: 'barber',
    },
    phone: {
      type: String,
      required: true,
    },
    shop: {
      shopName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      ownerName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      shopImage: {
        type: String,
        required: false, // Optional, in case some barbers don't have shop images
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Barber', barberSchema);
