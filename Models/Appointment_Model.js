const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  appointmentDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], default: 'pending' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
