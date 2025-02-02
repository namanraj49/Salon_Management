const Shop_Model = require("../Models/Shop_Model");
const Customer_Model = require("../Models/Customer_Model");
const bcrypt = require("bcrypt");
const generateToken = require("../Controllers/Token_generator");
const generateRefreshToken = require("../Controllers/Token_generator");
// Helper function to check if a user exists
const findExistingUser = async (Model, criteria) => {
  return await Model.findOne(criteria);
};

// Helper function to register a new user or shop
const registerEntity = async (Model, entityData, res) => {
  try {
    if (!entityData.password) {
      return res.status(400).send("Password is required.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(entityData.password, 10);

    // Create the entity (shop or user)
    const entity = await Model.create({
      ...entityData,
      password: hashedPassword,
    });

    // Generate a token
    const token = generateToken(entity);
    const refreshToken = generateRefreshToken(entity);
    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true, secure: isProduction });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: isProduction });
    // Respond with success
    res.status(201).send("Registered successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error during registration.");
  }
};

// Helper function to validate a password
const checkPassword = async (user, password, res) => {
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Password is incorrect.");
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set tokens in cookies
    res.cookie("token", token, { httpOnly: true, secure: isProduction });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: isProduction });

    // Respond with success
    return { success: true, token, refreshToken };
  } catch (err) {
    console.error("Error validating password:", err.message);
    return res.status(500).send("Error validating password.");
  }
};


// Register user
module.exports.registerUser = async (req, res) => {
  const { email, phone, name, password } = req.body;
  
  // Logging incoming request data
  console.log("Incoming request data:", req.body);

  if (!email || !phone || !name || !password) {
    console.log("Missing required fields!");
    return res.status(400).send("All fields are required.");
  }

  try {
    const existingUser = await findExistingUser(Customer_Model, { $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).send("You already have an account.");
    }

    await registerEntity(Customer_Model, { email, phone, name, password }, res);
  } catch (err) {
    console.error("Error during registration:", err);  // More detailed error logging
    res.status(500).send("Error registering user.");
  }
};


// Register shop
module.exports.registerShop = async (req, res) => {
  const { email, phone, name, password, shopName, ownerName, address, shopImage } = req.body;
  if (!email || !phone || !name || !password || !shopName || !ownerName || !address) {
    return res.status(400).send("All fields are required.");
  }
  try {
    const existingShop = await findExistingUser(Shop_Model, { $or: [{ email }, { phone }] });
    if (existingShop) {
      return res.status(400).send("Shop already exists.");
    }
    await registerEntity(
      Shop_Model,
      { email, phone, name, password, shop: { shopName, ownerName, address, shopImage } },
      res
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error registering shop.");
  }
};

// Login user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  try {
    const user = await Customer_Model.findOne({ email });
    if (!user) {
      return res.status(400).send("User is not registered.");
    }

    // Delegate password checking and token generation to checkPassword
    const result = await checkPassword(user, password, res);
    if (result.success) {
      return res.status(200).send("User logged in successfully.");
    }
  } catch (err) {
    console.error("Error during user login:", err.message);
    res.status(500).send("An error occurred while logging in.");
  }
};


// Login shop
module.exports.loginShop = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  try {
    const shop = await Shop_Model.findOne({ email });
    if (!shop) {
      return res.status(400).send("Shop is not registered.");
    }

    // Delegate password checking and token generation to checkPassword
    const result = await checkPassword(shop, password, res);
    if (result.success) {
      return res.status(200).send("Shop logged in successfully.");
    }
  } catch (err) {
    console.error("Error during shop login:", err.message);
    res.status(500).send("An error occurred while logging in.");
  }
};


// Logout user
module.exports.logoutUser = function (req, res) {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session", err);
    }
    res.redirect("/");
  });
};

// Logout shop
module.exports.logoutShop = function (req, res) {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session", err);
    }
    res.redirect("/");
  });
};
