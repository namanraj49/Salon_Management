const Slot = require("../models/Slot");

const generateSlots = async (barberId) => {
    const availableTimes = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const formattedDate = date.toISOString().split("T")[0];

        for (let time of availableTimes) {
            await Slot.create({ barberId, date: formattedDate, time, status: "available" });
        }
    }
};

module.exports = generateSlots;
