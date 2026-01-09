import express from "express";
import { config } from "./config/index.js";

const app = express();
const PORT = config.port || 3000;

app.listen(80, ()=>{
    console.log(`Server started at: http://localhost:${PORT}`);
});