const asyncHandler = require("../utils/asyncHnadler.js");
const Shop = require("../Models/Shop_Model");
const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");

// Get shop details from frontend
// Validate format and empty fields
// Check if already exists
// Check for shop image and barber image
// Upload them
// Create shop object, entry in DB
// Remove password and refresh token
// Check for shop creation
// Return response

const register_shop = asyncHandler(async (req, res) => {
  const { shopName, ownerName, email, address, shopImage } = req.body;
  console.log("email", email);

  // Validate required fields
  if (shopName === "") {
    throw new ApiError(400, "shopName required");
  }

  if (ownerName === "") {
    throw new ApiError(400, "ownerName required");
  }

  if (email === "") {
    throw new ApiError(400, "email required");
  }

  if (address === "") {
    throw new ApiError(400, "address required");
  }

  // Check if shop already exists
  const existedShop = await Shop.findOne({
    $or: [{ shopName }, { email }],
  });

  if (existedShop) {
    throw new ApiError(409, "shop already exists");
  }

  // Create shop object
  const createdShop = await Shop.create({
    shopName,
    ownerName,
    email,
    address,
    shopImage,
  });

  if (!createdShop) {
    throw new ApiError(500, "Something went wrong while registering shop");
  }

  // Return successful response
  return res.status(201).json(
    new ApiResponse(200, createdShop, "Shop registered successfully")
  );
});

module.exports = { register_shop };
