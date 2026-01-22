import express from "express";
import { isAdmin, isAurthor, isContributor, isEditor, isLoggedIn } from "../middlewares/auth.middleware.js";
import { create, deleteAPost, deleteOwn, getPostsAll, update, updateOwn } from "../controllers/post.controller.js";
const router = express.Router();

router.route("/create/admin").post(isAdmin, create);
router.route("/create/aurthor").post(isAurthor, create);
router.route("/create/contributor").post(isContributor, create);
router.route("/update/editor/:id").patch(isEditor, update);
router.route("/update/contributor/:id").patch(isContributor, update);
router.route("/update/aurthor/:id").patch(isAurthor, updateOwn);
router.route("/delete/admin/:id").delete(isAdmin, deleteAPost);
router.route("/delete/author/:id").delete(isAurthor, deleteOwn);
router.route("/").get(getPostsAll);

export default router;