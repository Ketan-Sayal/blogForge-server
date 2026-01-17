import {prisma as client} from "../lib/prisma.js";
import type { IComment, IUpdateComment } from "../types/index.js";

export const createComment = async({userId, postId, message}:IComment)=>{
    try {
        const comment = await client.comment.create({
            data:{
                userId,
                postId,
                message
            },
            select:{
                userId:true,
                post:true,
                message:true,
            }
        });
        return comment;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return;
        }
        console.log(error);
        return null;
    }
}

export const updateComment = async({id, message}:IUpdateComment)=>{
    try {
        const updatedComment = await client.comment.update({
            where:{
                id:id
            },
            data:{
                message:message
            },
            select:{
                userId:true,
                post:true,
                message:true,
            }
        });
        return updatedComment;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}

export const deleteComment = async(id:number)=>{
    try {
        await client.comment.delete({
            where:{
                id:id
            }
        });
        return true;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return false;
        }
        console.log(error);
        return false;
    }
}

export const getPostComments = async(postId:number)=>{
    try {
        const comments = await client.comment.findMany({
            where:{
                postId:postId
            }
        });
        return comments;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}