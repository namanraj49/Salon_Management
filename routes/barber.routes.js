import {Router} from "express";
import { shopowner_verify } from "../middlewares/shop_owner.middleware.js";
import {addbarber,deletebarber,update_barber_details} from "../Controllers/barber_features.js"

const router = Router();

router.route("/add_barber").post(shopowner_verify,addbarber)
router.route("/delete_barber").post(shopowner_verify,deletebarber)
router.route("/update_barber").post(update_barber_details)