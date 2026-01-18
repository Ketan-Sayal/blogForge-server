import {prisma as client, ROLES} from "../lib/prisma.js";
import type { IUser } from "../types/index.js";

export const createAurthor = async({username, email, password, pic, publicId}:IUser)=>{
    try {
        const res = await client.user.create({
        data:{
            username,
            email,
            password,
            role:ROLES.AURTHOR,
            pic:pic || "https://cdn-icons-png.flaticon.com/128/456/456212.png",
            publicId: publicId || "",
        },
        select:{
            id:true,
            username:true,
            email:true,
            blogs:true,
            comments:true
        }
    });
    return res;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}