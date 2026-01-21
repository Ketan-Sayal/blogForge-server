import express from "express";
import { signin, signup } from "../controllers/contributor.controller.js";
import { isContributor } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/validate/user").get(isContributor, getUser);
router.route("/signin").post(signin);

export default router;