import express from "express";
import { config } from "./config/index.js";

const app = express();
const PORT = config.port || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));


import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);


app.listen(80, ()=>{
    console.log(`Server started at: http://localhost:${PORT}`);
});