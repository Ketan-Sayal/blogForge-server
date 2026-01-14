import express from "express";
import { getUser, signin, signup } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/validate/user").get(isLoggedIn, getUser);

export default router;