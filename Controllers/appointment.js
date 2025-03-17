const Appointment = require("../models/Appointment_Model");

require("../Models/Customer_Model");
require("../Models/Barber_Model");
require("../Models/Service_Model");

// 1️⃣ Function to Insert a New Appointment
const addAppointment = async (req, res) => {
  try {
    const { customer, service, barber, appointmentDate, time, status, notes } = req.body;
    const newAppointment = new Appointment({
      customer,
      service,
      barber,
      appointmentDate,
      time,
      status: status || "pending",
      notes,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json({ message: "Appointment added successfully", appointment: savedAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2️⃣ Function to Fetch All Appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("customer service barber");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3️⃣ Function to Update Appointment Status
// 3️⃣ Function to Update Appointment Status
const updateAppointmentStatus = async (req, res) => {
  try {
    console.log("Received request to update appointment:", req.params.id, req.body); // Debugging log

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      console.log("Appointment not found in database");
      return res.status(404).json({ message: "Appointment not found" });
    }

    console.log("Appointment updated successfully:", updatedAppointment);
    res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export all functions
module.exports = {
  addAppointment,
  getAppointments,
  updateAppointmentStatus,
};
