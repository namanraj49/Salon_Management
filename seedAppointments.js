require("dotenv").config();
const mongoose = require("mongoose");
const Appointment = require("./models/Appointment_Model"); // Adjust path as needed

// MongoDB connection
const uri = "mongodb+srv://namanrajpurohit49:LbPcKj3Q4QR3AjED@cluster0.0wqqt.mongodb.net/salonDB?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // Dummy Data
    const dummyAppointments = [
      {
        customer: new mongoose.Types.ObjectId(), // Replace with real ID
        service: new mongoose.Types.ObjectId(),
        barber: new mongoose.Types.ObjectId(),
        appointmentDate: new Date("2025-03-10"),
        time: "10:30 AM",
        status: "pending",
        notes: "Customer prefers morning slot",
      },
      {
        customer: new mongoose.Types.ObjectId(),
        service: new mongoose.Types.ObjectId(),
        barber: new mongoose.Types.ObjectId(),
        appointmentDate: new Date("2025-03-11"),
        time: "02:00 PM",
        status: "confirmed",
        notes: "VIP customer",
      },
    ];

    // Insert into MongoDB
    await Appointment.insertMany(dummyAppointments);
    console.log("✅ Dummy appointments inserted successfully!");
    
    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
  } catch (error) {
    console.error("❌ Error inserting dummy appointments:", error);
  }
};

connectDB();
