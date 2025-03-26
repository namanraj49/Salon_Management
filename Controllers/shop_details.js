const Barber_Model = require("../Models/Barber_Model"); // Make sure the correct model is imported
const Service = require("../Models/Service_Model");
module.exports.getShopProfile = async (req, res) => {
  try { 
    const shopId = req.query.shopId; // ✅ Extract from query params
    
    if (!shopId) { 
      console.error("❌ Missing shopId in request"); // ✅ Debugging log
      return res.status(400).json({ error: "Shop ID is required" });
    }

    console.log("Received shopId:", shopId); // ✅ Debugging log

    const shopy = await Barber_Model.findById(shopId); 

    if (!shopy) {
      console.error("❌ No shop found for ID:", shopId); // ✅ Debugging log
      return res.status(404).json({ error: "Shop not found" });
    }

    return res.status(200).json({
      name: shopy.name,
      email: shopy.email,
      phone: shopy.phone,
      address: shopy.shop.address,
      shopName: shopy.shop.shopName,
      ownerName: shopy.shop.ownerName,
      shopImage: shopy.shop.shopImage,
    });
  } catch (err) {
    console.error("❌ Error fetching shop profile:", err.message);
    return res.status(500).json({ error: "An error occurred while fetching the shop profile." });
  }
};

module.exports.addService = async (req, res) => {
  try {
    const { barberId, name, description, price, duration } = req.body; // Extract from request

    if (!barberId || !name || !price || !duration) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const barber = await Barber_Model.findById(barberId);
    if (!barber) {
      return res.status(404).json({ error: "Barber not found" });
    }

    const newService = new Service({ barberId, name, description, price, duration });
    await newService.save();

    return res.status(201).json({ message: "Service added successfully", service: newService });
  } catch (err) {
    console.error("❌ Error adding service:", err.message);
    return res.status(500).json({ error: "An error occurred while adding the service." });
  }
};

module.exports.getBarberServices = async (req, res) => {
  try {
      const services = await Service.find({ barberId: req.params.barberId });
      res.json(services);
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
};

// Update a specific service
module.exports.updateService = async (req, res) => {
  try {
      console.log("Received update request for service ID:", req.params.serviceId);
      console.log("Request body:", req.body);

      const { name, description, price, duration } = req.body;
      const updatedService = await Service.findByIdAndUpdate(
          req.params.serviceId,
          { name, description, price, duration },
          { new: true }
      );

      if (!updatedService) {
          console.log("Service not found");
          return res.status(404).json({ error: "Service not found" });
      }

      console.log("Updated service:", updatedService);
      res.json(updatedService);
  } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({ error: "Server error" });
  }
};
