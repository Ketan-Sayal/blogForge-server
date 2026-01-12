import * as dotenv from "dotenv";
dotenv.config();

interface IConfig{
    port:number;
    jwtUserSecret:string;
}

export const config:IConfig = {
    port: parseInt(new String(process.env.PORT).toString()) || 3000,
    jwtUserSecret: new String(process.env.JWT_USER_SECRET).toString(),
}