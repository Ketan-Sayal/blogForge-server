import * as dotenv from "dotenv";
dotenv.config();

interface IConfig{
    port:number;
    jwtUserSecret:string;
    cloudinaryApiKey:string;
    cloudinaryApiSecret:string;
    cloudName:string;
}

export const config:IConfig = {
    port: parseInt(new String(process.env.PORT || 3000).toString()),
    jwtUserSecret: new String(process.env.JWT_USER_SECRET).toString(),
    cloudinaryApiKey: new String(process.env.CLOUDINARY_API_KEY).toString(),
    cloudinaryApiSecret: new String(process.env.CLOUDINARY_API_SECRET).toString(),
    cloudName: new String(process.env.CLOUDINARY_CLOUD_NAME).toString(),
}