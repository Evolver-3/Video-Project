import { Router } from "express";
import { loginController, refreshAccessToken, registerController,getUserProfile, logoutUser} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router()

router.route("/register").post(upload.fields([
  {name:"avatar",maxCount:1},
  { name:"coverImage",maxCount:1}
]),registerController)

router.route("/login").post(loginController)

router.route("/logout").post(verifyJWT,logoutUser)

router.route("/refreshToken").post(refreshAccessToken)

router.route("/profile").get(verifyJWT,getUserProfile)

export {router} 