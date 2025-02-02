const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not set in environment variables.");
  }
  return jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_KEY,
    { expiresIn: "15m" } // Access token valid for 15 minutes
  );
};

const generateRefreshToken = (user) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not set in environment variables.");
  }
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // Refresh token valid for 7 days
  );
};

module.exports = { generateToken, generateRefreshToken }; 