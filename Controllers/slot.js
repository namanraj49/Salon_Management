const Slot = require("../Models/Slots_Model");

//const { notifyBarber, notifyCustomer } = require("../utils/notifications");

// Get Available Slots for a Barber
exports.getAvailableSlots = async (req, res) => {
    try {
        const { barberId } = req.params;
        const slots = await Slot.find({ barberId, status: "available" });
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Customer Books a Slot (Sets it as Pending)
exports.bookSlot = async (req, res) => {
    const { slotId, customerId } = req.body;

    try {
        const slot = await Slot.findById(slotId);
        if (!slot || slot.status !== "available") {
            return res.status(400).json({ message: "Slot is not available" });
        }

        slot.status = "pending";
        slot.bookedBy = customerId;
        await slot.save();

        // Emit event to notify only the specific barber
        req.io.to(`barber-${slot.barberId}`).emit("appointment_request", {
            type: "new_booking",
            message: "New appointment request",
            slotId: slot._id,
            customerId: customerId,
        });

        res.json({ message: "Slot booked, awaiting barber confirmation", slot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Barber Accepts/Rejects Slot
exports.updateSlotStatus = async (req, res) => {
    const { slotId } = req.params;
    const { status } = req.body; // "accepted" or "rejected"

    try {
        const slot = await Slot.findById(slotId);
        if (!slot || slot.status !== "pending") {
            return res.status(400).json({ message: "Invalid slot update" });
        }

        if (status === "accepted") {
            slot.status = "booked";
        } else {
            slot.status = "available";
            slot.bookedBy = null;
        }

        await slot.save();

                // Notify the customer via WebSocket
                req.io.to(`customer-${slot.bookedBy}`).emit("appointment_update", {
                    slotId,
                    status,
                    message: `Your appointment has been ${status}.`,
                });
        
        res.json({ message: `Slot ${status} successfully`, slot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
