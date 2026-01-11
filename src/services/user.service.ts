import {prisma as client} from "../lib/prisma.js";
import type { IUpdatePassword, IUser } from "../types/index.js";

export const createUser = async({username, email, password}:IUser)=>{
    const res = await client.user.create({
        data:{
            username,
            email,
            password
        },
        select:{
            username:true,
            email:true,
            blogs:true,
            comments:true
        }
    });
    return res;
}

export const getUserById = async(id:number)=>{
    const user = await client.user.findFirst({
        where:{
            id:id
        },
        select:{
            username:true,
            email:true,
            blogs:true,
            comments:true
        }
    });
    return user;
}

export const getUserBlogs = async(id:number)=>{
    const userBlogs = await client.user.findFirst({
        where:{
            id:id,
        },
        select:{
            blogs:true,
        }
    });
    return userBlogs;
}

export const updatePassword = async({password, email}:IUpdatePassword)=>{
    const res = await client.user.update({
        where:{
            email:email
        },
        data:{
            password
        },
        select:{
            email:true,
        }
    });
    return res;
}