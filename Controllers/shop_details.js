const Barber_Model = require("../Models/Barber_Model"); // Make sure the correct model is imported

module.exports.getShopProfile = async (req, res) => {
  try {
    const shopId = "67c6c0238c3dab0e7f39734e"; // Hardcoded for testing
    const shopy = await Barber_Model.findById(shopId); 

    if (!shopy) {
      return res.status(404).json({ error: "Shop not found" });
    }

    return res.status(200).json({
      name: shopy.name,
      email: shopy.email,
      phone: shopy.phone,  // Fixed: Fetching contact from shop object
      address: shopy.shop.address, // Fixed: Fetching location from shop object
      shopName: shopy.shop.shopName,
      ownerName: shopy.shop.ownerName,
      shopImage: shopy.shop.shopImage,
    });
  } catch (err) {
    console.error("Error fetching shop profile:", err.message);
    return res.status(500).json({ error: "An error occurred while fetching the shop profile." });
  }
};
