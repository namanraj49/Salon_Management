const User_Model = require("../Models/User_Model");
const Client_Model = require("../Models/Client_Model");
const bcrypt = require("bcrypt");
const generateToken = require("../Controllers/Token_generator");

// Helper function to check if a user exists
const findExistingUser = async (Model, criteria) => {
  return await Model.findOne(criteria);
};

// Helper function to register a new user or client
const registerEntity = async (Model, entityData, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(entityData.password, 10);

    // Create the entity
    const entity = await Model.create({
      ...entityData,
      password: hashedPassword,
    });

    // Generate a token
    const token = generateToken(entity);

    // Set the token in a cookie
    res.cookie("token", token);

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
    res.cookie("token", token);

    // Redirect to homepage (update route as needed)
    res.redirect("/homepage"); // Change "/homepage" to your actual route
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error validating password.");
  }
};

// Register user
module.exports.registerUser = async (req, res) => {
  const { email, phone, name, password } = req.body;
  try {
    const existingUser = await findExistingUser(User_Model, { $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).send("You already have an account.");
    }
    await registerEntity(User_Model, { email, phone, name, password }, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error registering user.");
  }
};

// Register client
module.exports.registerClient = async (req, res) => {
  const { email, phone, name, password } = req.body;
  try {
    const existingClient = await findExistingUser(Client_Model, { $or: [{ email }, { phone }] });
    if (existingClient) {
      return res.status(400).send("Client already exists.");
    }
    await registerEntity(Client_Model, { email, phone, name, password }, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error registering client.");
  }
};

// Login user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User_Model.findOne({ email });
    if (!user) {
      return res.status(400).send("User is not registered.");
    }
    await checkPassword(user, password, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("An error occurred while logging in.");
  }
};

// Login client
module.exports.loginClient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await Client_Model.findOne({ email });
    if (!client) {
      return res.status(400).send("Client is not registered.");
    }
    await checkPassword(client, password, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("An error occurred while logging in.");
  }
};

// Logout user
module.exports.logoutUser = function (req, res) {
  res.clearCookie("token");
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session", err);
    }
    res.redirect("/");
  });
};

// Logout client
module.exports.logoutClient = function (req, res) {
  res.clearCookie("token");
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session", err);
    }
    res.redirect("/");
  });
};
