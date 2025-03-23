const express = require('express');
const { getShopProfile } = require('../Controllers/shop_details.js');

const shops = express.Router();

shops.route("/shop_profile").get(getShopProfile);


module.exports = shops;
