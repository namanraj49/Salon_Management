const express = require('express');
const { loginShop, loginUser, logoutShop, logoutUser, registerUser, registerShop } = require('../Controllers/auth_user.js');
const {refreshToken} =  require('../Controllers/Validate_refreshtoken.js')
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/registerShop").post(registerShop);  
router.route("/login").post(loginUser);
router.route("/loginClient").post(loginShop); 
router.route("/logoutUser").post(logoutUser);
router.route("/logoutClient").post(logoutShop);
router.post("/refresh-token", refreshToken);

module.exports = router;
