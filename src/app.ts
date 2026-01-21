import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.routes.js";
import editorRouter from "./routes/editor.route.js";
import aurthorRouter from "./routes/aurthor.route.js";
import contributorRouter from "./routes/contributor.route.js";
import postRouter from "./routes/post.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/editors", editorRouter);
app.use("/api/v1/contributors", contributorRouter);
app.use("/api/v1/aurthors", aurthorRouter);
app.use("/api/v1/posts", postRouter);

export {app};