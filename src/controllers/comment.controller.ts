import type { NextFunction, Response, Request } from "express"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { createComment, deleteComment, getCommentById, getPostComments, updateComment } from "../services/comment.service.js";
import { getPostById } from "../services/post.service.js";

export const create = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const userId = req.userId || -1;
    const postId = parseInt(req.params.postId || "");
    const { message } = req.body;
    if(!message){
        throw new ApiError(403, "Invalid feilds");
    }
    const comment = await createComment({userId, postId, message});
    if(!comment){
        throw new ApiError(405, "Comment cannot be created");
    }
    return res.status(200).json(new ApiResponse(200, {comment}, "Comment created sucessfully"));
});

export const updateAComment = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const message = req.body.message;
    const commentId = parseInt(req.params.id || "");
    if(!message || !commentId){
        throw new ApiError(403, "Invalid feilds");
    }
    const comment = await getCommentById(commentId);
    if(!comment){
        throw new ApiError(404, "Comment not found");
    }
    const updatedComment = await updateComment({id:commentId, message});
    if(!updatedComment){
        throw new ApiError(406, "Something went wrong while updating comment");
    }
    return res.status(200).json(new ApiResponse(200, {updatedComment}, "Comment updated successfully"));
});

export const deleteAComment = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const commentId = req.params.id;
    if(!commentId){
        throw new ApiError(403, "Invalid comment id");
    }
    const id = parseInt(commentId || "");
    const comment = await getCommentById(id);
    if(!comment){
        throw new ApiError(404, "Comment not found");
    }
    const isDeleted = await deleteComment(id);
    if(!isDeleted){
        throw new ApiError(406, "Comment deleted successfully");
    }
    return res.status(200).json(new ApiResponse(200, {success:true}, "Comment deleted sucessfully"));
});

export const getCommentsOfAPost = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const postId = parseInt(req.params.postId || "");
    const post = await getPostById(postId);
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    const comments = await getPostComments(postId);
    return res.status(200).json(new ApiResponse(200, {comments}, "Comments of post sent successfully"));
});