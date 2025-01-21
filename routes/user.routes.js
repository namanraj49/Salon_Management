

import {Router} from "express"
import { loginClient, loginUser, logoutClient, logoutUser, registerUser } from "../Controllers/auth_user.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/loginClient").post(loginClient)
router.route("/logoutUser").post(logoutUser)
router.route("/logoutClient").post(logoutClient)

export default router                     