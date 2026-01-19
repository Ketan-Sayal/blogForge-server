import express from "express";
import {signin, signup} from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/validate/user").get(isAdmin, getUser);
router.route("/signin").post(signin);

export default router;