import express from "express";
import { signin, signup } from "../controllers/editor.controller.js";
import { isEditor } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/validate/user").get(isEditor, getUser);
router.route("/signin").post(signin);

export default router;