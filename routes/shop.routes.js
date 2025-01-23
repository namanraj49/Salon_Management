import { Router } from "express";
import {register_shop,getshop} from "../Controllers/shop_details.js"

const router = Router();

router.route("/shop_register").post(register_shop)
router.route("/getshop").post(getshop)

export default router;

