import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminRouter);

export {app};