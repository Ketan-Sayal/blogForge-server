import {prisma as client, ROLES} from "../lib/prisma.js";
import type {IUpdatePassword,  IUser } from "../types/index.js";

export const createAdmin = async({username, email, password}:IUser)=>{
    try {
        const res = await client.user.create({
        data:{
            username,
            email,
            password,
            role:ROLES.ADMIN
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

export const getAdminById = async(id:number)=>{
    
    try {
        const user = await client.user.findFirst({
        where:{
            id:id,
            role:ROLES.ADMIN
        },
        select:{
            id:true,
            username:true,
            email:true,
            blogs:true,
            comments:true
        }
    });
    return user;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}

export const blockUser = async(id:number)=>{
    try {
        
    } catch (error) {
         if(error instanceof Error){
            console.log(error.message);
        }
        console.log(error);
        return false;
    }
}