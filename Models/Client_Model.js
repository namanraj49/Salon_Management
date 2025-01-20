const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Add this field
  totalVisits: { type: Number, default: 0 },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', index: true }],
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
