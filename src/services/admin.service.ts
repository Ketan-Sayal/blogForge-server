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
            return;
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
            return;
        }
        console.log(error);
        return null;
    }
}

export const blockPost = async(postId:number)=>{
    
    try {
        const res = await client.post.update({
        where:{
            id:postId
        },
        data:{
            published:false
        }
    });
    return res;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return;
        }
        console.log(error);
        return null;
    }
}

export const deletePost = async(postId:number)=>{
    
    try {
        await client.post.delete({
        where:{
            id:postId
        }
    });
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return;
        }
        console.log(error);
        return null;
    }
}

export const unblockPost = async(postId:number)=>{
    
    try {
        const res = await client.post.update({
        where:{
            id:postId
        },
        data:{
            published:true
        }
    });
    return res;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return;
        }
        console.log(error);
        return null;
    }
}