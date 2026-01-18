import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import { config } from '../config/index.js';

cloudinary.config({ 
  cloud_name: config.cloudName, 
  api_key: config.cloudinaryApiKey, 
  api_secret: config.cloudinaryApiSecret,
});

export const upload = async(localPath:string)=>{
    try {
        const res = await cloudinary.uploader.upload(localPath, {
            resource_type:"auto"
        });
        fs.unlinkSync(localPath);
        return {url:res.secure_url, publicId:res.public_id};
    } catch (error) {
        try {
            fs.unlinkSync(localPath);
        } catch (_) {};
        throw error;
    }
}

export const deleteUpload = async(publicId:string)=>{
    try {
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}