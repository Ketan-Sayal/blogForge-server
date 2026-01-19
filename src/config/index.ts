import * as dotenv from "dotenv";
import type { IConfig } from "../types/index.js";
dotenv.config();

export const config:IConfig = {
    port: parseInt(new String(process.env.PORT || 3000).toString()),
    jwtUserSecret: new String(process.env.JWT_USER_SECRET).toString(),
    cloudinaryApiKey: new String(process.env.CLOUDINARY_API_KEY).toString(),
    cloudinaryApiSecret: new String(process.env.CLOUDINARY_API_SECRET).toString(),
    cloudName: new String(process.env.CLOUDINARY_CLOUD_NAME).toString(),
    jwtAdminSecret: new String(process.env.JWT_ADMIN_SECRET).toString(),
    jwtAurthorSecret: new String(process.env.JWT_AURTHOR_SECRET).toString(),
    jwtContributorSecret: new String(process.env.JWT_CONTRIBUTOR_SECRET).toString(),
    jwtEditorSecret: new String(process.env.JWT_EDITOR_SECRET).toString(),
}