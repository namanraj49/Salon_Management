const jwt = require("jsonwebtoken");
const generateToken = require("./Token_generator"); // Function to generate access tokens

module.exports.refreshToken = async (req, res) => {
  // Extract the refresh token from cookies
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send("Refresh token is required.");
  }

  try {
    // Verify the refresh token using the secret
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Extract user details from the decoded token
    const user = { id: decoded.id, email: decoded.email };

    // Generate a new access token
    const newAccessToken = generateToken(user);

    // Send the new access token back in cookies
    res.cookie("token", newAccessToken, { httpOnly: true, secure: true });
    res.status(200).send("Access token refreshed.");
  } catch (err) {
    console.error(err.message);
    res.status(403).send("Invalid refresh token.");
  }
};
