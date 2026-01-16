import {prisma as client, ROLES} from "../lib/prisma.js";
import type { IUser } from "../types/index.js";

export const createEditor = async({username, email, password}:IUser)=>{
    try {
        const res = await client.user.create({
        data:{
            username,
            email,
            password,
            role:ROLES.EDITOR
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