

import {Router} from "express"
import { loginClient, loginUser, logoutClient, logoutUser, registerUser } from "../Controllers/auth_user.js"
import { verifyjwt } from "../middlewares/auth.middleware.js"
import { verify } from "jsonwebtoken"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(verifyjwt,loginUser)
router.route("/loginClient").post(loginClient)
router.route("/logoutUser").post(verifyjwt,logoutUser)
router.route("/logoutClient").post(logoutClient)

export default router                     