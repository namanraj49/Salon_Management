const express = require("express");
const { getAvailableSlots, bookSlot, updateSlotStatus } = require("../Controllers/slot");

const router = express.Router();

//router.roite("/:barberId", getAvailableSlots);  // Get available slots for a barber
//router.post("/book", bookSlot);              // Customer books a slot
//router.put("/update/:slotId", updateSlotStatus);// Barber accepts/rejects slot

router.route("/barberId").post(getAvailableSlots);
router.route("/book").post(bookSlot);  
router.route("/update/:slotId").post( updateSlotStatus);

module.exports = router;
