const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  barber: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber' },
  appointmentDate: { type: Date, required: true },
  time: {type:String,required:true},
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], default: 'pending' },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
