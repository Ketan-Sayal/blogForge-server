import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { createCategory } from "../services/category.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getPostByCategories, getPostById } from "../services/post.service.js";

export const create = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const {type} = req.body;
    if(!type){
        throw new ApiError(403, "Invalid feilds");
    }
    const category = await createCategory(type);
    if(!category){
        throw new ApiError(500);
    }
    return res.status(200).json(new ApiResponse(200, {category}, "Category created successfully"));
});

export const postCategories = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const postId = parseInt(req.params.postId || "");
    const post = await getPostById(postId);
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    const categories = await getPostByCategories(postId);
    return res.status(200).json(new ApiResponse(200, {categories}, "post categories sent successfully"));
});