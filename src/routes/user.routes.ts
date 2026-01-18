import express from "express";
import { getUser, signin, signup } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/signin").post(signin);
router.route("/validate/user").get(isLoggedIn, getUser);
router.route("/signup").post(upload.single("pic"), signup);

export default router;