import {prisma as client} from "../lib/prisma.js";
import type { IUpdatePassword, IUpdateUserPic, IUser, IUsername } from "../types/index.js";

export const createUser = async({username, email, password, pic, publicId}:IUser)=>{
    try {
        const res = await client.user.create({
        data:{
            username,
            email,
            password,
            pic:pic || "https://cdn-icons-png.flaticon.com/128/456/456212.png",
            publicId: publicId || ""
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

export const getUserById = async(id:number)=>{
    try {
        const user = await client.user.findFirst({
        where:{
            id:id
        },
        select:{
            id:true,
            username:true,
            email:true,
            blogs:true,
            comments:true,
            role:true
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

export const getUserBlogs = async(id:number)=>{
    try {
        const userBlogs = await client.user.findFirst({
        where:{
            id:id,
        },
        select:{
            blogs:true,
        }
    });
    return userBlogs;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}

export const updatePassword = async({password, email}:IUpdatePassword)=>{
    try {
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
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}

export const getUserByEmail = async(email:string)=>{
    try {
        const user = await client.user.findFirst({
        where:{
            email:email
        },
        select:{
            id:true,
            username:true,
            email:true,
            role:true,
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

export const getUserPassword = async(id:number)=>{
    try {
        const user = await client.user.findFirst({
            where:{
                id:id,
            },
            select:{
                password:true,
            }
        });
        return user?.password;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}

export const updateUsername = async(data:IUsername)=>{
    try {
        const updatedUser = await client.user.update({
            where:{
                email:data.email,
            },
            data:{
                username:data.username
            }
        });
        return updatedUser;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}

export const updateUserPic = async(data:IUpdateUserPic)=>{
    try {
        const updatedUser = await client.user.update({
            where:{
                id:data.id,
            },
            data:{
                pic:data.pic || "",
                publicId:data.publicId || "",
            }
        });
        return updatedUser;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}