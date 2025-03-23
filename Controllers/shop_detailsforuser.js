const Barber = require("../Models/Barber_Model");

// Fetch all salons
const getAllSalons = async (req, res) => {
  try {
    const salons = await Barber.find({}, "shop.shopName shop.ownerName shop.address shop.shopImage phone email");
    res.json(salons);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getAllSalons };
