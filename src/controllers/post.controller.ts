import { response, type NextFunction, type Request, type Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { PostSchema, PostUpdateSchema } from "../validators/post.validator.js";
import { ApiError } from "../utils/ApiError.js";
import { createPost, deletePost, getAllPosts, getPostByCategories, getPostById, updatePost } from "../services/post.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const create = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const { title, content, publishedDate, categories } = req.body;
    const userId = req.params.userId;
    const orignalPublishedDate = new Date(publishedDate) || new Date();
    const {success} = PostSchema.safeParse({title, content, publishedDate: orignalPublishedDate, categories});
    if(!success){
        throw new ApiError(403, "Invalid creds");
    }
    const categoriesIdArray:number[] = categories.split(" ").map((id:string)=>parseInt(id));
    const newPost = await createPost({categories:categoriesIdArray, title, content, publishedDate: orignalPublishedDate, userId:parseInt(userId || "")});
    if(!newPost){
        throw new ApiError(405, "Post cannot be created");
    }
    return res.status(200).json(new ApiResponse(200, {post:newPost}, "New post created successfully"));
});

export const update = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const {content, title} = req.body;
    const {success} = PostUpdateSchema.safeParse({title, content});
    const postId = req.params.id;
    if(!success){
        throw new ApiError(402, "Invalid feilds");
    }
    const post = await getPostById(parseInt(postId || ""));
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    const updatedPost = await updatePost({content, title, id: parseInt(postId || "")});
    if(!updatedPost){
        throw new ApiError(405, "Post cannot be updated");
    }
    return res.status(200).json(new ApiResponse(200, {post:updatedPost}, "Post updated successfully"));
});

export const updateOwn = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const {content, title} = req.body;
    const userId = req.userId;
    const {success} = PostUpdateSchema.safeParse({title, content});
    const postId = req.params.id;
    
    if(!success){
        throw new ApiError(402, "Invalid feilds");
    }
    const post = await getPostById(parseInt(postId || ""));
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    if(post.userId!=userId){
        throw new ApiError(403, "You are not the owner of the post");
    }
    const updatedPost = await updatePost({content, title, id: parseInt(postId || "")});
    if(!updatedPost){
        throw new ApiError(405, "Post cannot be updated");
    }
    return res.status(200).json(new ApiResponse(200, {post:updatedPost}, "Post updated successfully"));
});

export const deleteAPost = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const postId = req.params.id;
    const isDeleted = await deletePost(parseInt(postId || ""));
    if(!isDeleted){
        throw new ApiError(406, "Post cannot be deleted");
    }
    return res.status(200).json(new ApiResponse(200, {success:true}, "Post deleted successfully"));
});

export const deleteOwn = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const postId = req.params.id;
    const post = await getPostById(parseInt(postId || ""));
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    if(post.userId!=req.userId){
        throw new ApiError(403, "You are not the owner");
    }
    const isDeleted = await deletePost(parseInt(postId || ""));
    if(!isDeleted){
        throw new ApiError(406, "Post cannot be deleted");
    }
    return res.status(200).json(new ApiResponse(200, {success:true}, "Post deleted successfully"));
});

export const getSinglePost = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const postId = parseInt(req.params.id || "");
    const post = await getPostById(postId);
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    return res.status(200).json(new ApiResponse(200, {post}, "Post sent successfully"));
});

export const getPostsByCategoryId = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const categoryId = req.params.categoryId;
    const posts = await getPostByCategories(parseInt(categoryId || ""));
    if(!posts){
        throw new ApiError(404, "Posts not found");
    }
    return res.status(200).json(new ApiResponse(200, {posts}, "Posts sent successfully"));
});

export const getPostsAll = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const posts = await getAllPosts();
    return res.status(200).json(new ApiResponse(200, {posts}, "Posts sent successfully"));
});