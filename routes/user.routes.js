const express = require('express');
const { loginShop, loginUser, logoutShop, logoutUser, registerUser, registerShop } = require('../Controllers/auth_user.js');
const {getShopProfile} = require('../Controllers/shop_details.js');
const {addAppointment,getAppointments,updateAppointmentStatus} = require('../Controllers/appointment.js')
const {refreshToken} =  require('../Controllers/Validate_refreshtoken.js')
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/registerShop").post(registerShop);  
router.route("/login").post(loginUser);
router.route("/loginClient").post(loginShop); 
router.route("/logoutUser").post(logoutUser);
router.route("/logoutClient").post(logoutShop);
router.route("/shopProfile").get(getShopProfile);
router.route("/appointments").post(addAppointment);
router.route("/getappointments").get(getAppointments);
router.route("/update/:id").put(updateAppointmentStatus);
router.post("/refresh-token", refreshToken);

module.exports = router;
