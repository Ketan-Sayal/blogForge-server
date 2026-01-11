import {prisma as client, ROLES} from "../lib/prisma.js";
import type {IUpdatePassword,  IUser } from "../types/index.js";

export const createAdmin = async({username, email, password}:IUser)=>{
    const res = await client.user.create({
        data:{
            username,
            email,
            password,
            role:ROLES.ADMIN
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

export const getAdminById = async(id:number)=>{
    const user = await client.user.findFirst({
        where:{
            id:id,
            role:ROLES.ADMIN
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

export const blockPost = async(postId:number)=>{
    const res = await client.post.update({
        where:{
            id:postId
        },
        data:{
            published:false
        }
    });
    return res;
}

export const deletePost = async(postId:number)=>{
    await client.post.delete({
        where:{
            id:postId
        }
    });
}

export const unblockPost = async(postId:number)=>{
    const res = await client.post.update({
        where:{
            id:postId
        },
        data:{
            published:true
        }
    });
    return res;
}