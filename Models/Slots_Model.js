const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: "Barber", required: true },
    date: { type: String, required: true },  // Format: YYYY-MM-DD
    time: { type: String, required: true },  // Format: HH:MM
    status: { type: String, enum: ["available", "pending", "booked"], default: "available" },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", default: null },
}, { timestamps: true });

module.exports = mongoose.model("Slot", slotSchema);
