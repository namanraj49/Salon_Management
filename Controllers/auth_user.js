
const isProduction = process.env.NODE_ENV === "production";
const Barber_Model = require("../Models/Barber_Model");
const Customer_Model = require("../Models/Customer_Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../Controllers/Token_generator");
const {generateRefreshToken} = require("../Controllers/Token_generator");
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
    console.log("User Password from DB:", user.password); // Debugging
    console.log("Entered Password:", password); // Debugging

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: "Password is incorrect." };
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("token", token, { httpOnly: true, secure: isProduction });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: isProduction });

    return { success: true, token, refreshToken };
  } catch (err) {
    console.error("Error validating password:", err.message);
    return { success: false, error: "Error validating password." };
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
    const existingShop = await findExistingUser(Barber_Model, { $or: [{ email }, { phone }] });

    if (existingShop) {
      return res.status(400).send("Shop already exists.");
    }

    // ✅ Correcting the shop object structure
    await registerEntity(
      Barber_Model,
      {
        email,
        phone,
        name,
        password,
        shop: {
          shopName,
          ownerName,
          address,
          shopImage,
        },
      },
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
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await Customer_Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User is not registered." });
    }

    const result = await checkPassword(user, password, res);
    if (result.success) {
      return res.status(200).json({
        message: "User logged in successfully.",
        token: result.token,
        refreshToken: result.refreshToken,
        role: "user", 
        userId: user._id,  // ✅ Return userId
      });
    } else {
      return res.status(401).json({ error: result.error });
    }
  } catch (err) {
    console.error("Error during user login:", err.message);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};




// Login shop
module.exports.loginShop = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const shop = await Barber_Model.findOne({ email });
    if (!shop) {
      return res.status(400).json({ error: "Shop is not registered." });
    }

    const result = await checkPassword(shop, password, res);
    if (result.success) {
      return res.status(200).json({
        message: "Shop logged in successfully.",  // ✅ Fixed message
        token: result.token,
        refreshToken: result.refreshToken,
        role: "shop",
        shopId: shop._id,  // ✅ Return shopId
      });
    } else {
      return res.status(401).json({ error: result.error });
    }
  } catch (err) {
    console.error("Error during shop login:", err.message);
    res.status(500).json({ error: "An error occurred while logging in." });
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
