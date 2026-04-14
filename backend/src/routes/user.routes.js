import { Router } from "express";
import { loginController, refreshAccessToken, registerController,getUserProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router()

router.route("/register").post(upload.single("avatar"),registerController)

router.route("/login").post(loginController)

router.route("/refreshToken").post(refreshAccessToken)

router.route("/profile").get(verifyJWT,getUserProfile)

export {router} 