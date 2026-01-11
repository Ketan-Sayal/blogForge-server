import * as dotenv from "dotenv";
dotenv.config();

interface IConfig{
    port:number;
}

export const config:IConfig = {
    port: parseInt(new String(process.env.PORT).toString()) || 3000,
}