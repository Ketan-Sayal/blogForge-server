import * as dotenv from "dotenv";
dotenv.config();

interface IConfig{
    port:number;
    jwtUserSecret:string;
}

export const config:IConfig = {
    port: parseInt(new String(process.env.PORT || 3000).toString()),
    jwtUserSecret: new String(process.env.JWT_USER_SECRET).toString(),
}