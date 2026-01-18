import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, getUserById, getUserPassword } from "../services/user.service.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { UserSigninSchema, UserSignupSchema } from "../validators/user.validator.js";
import { ApiError } from "../utils/ApiError.js";
import { config } from "../config/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { upload } from "../utils/Cloudinary.js";

const signup = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const {username, email, password} = req.body;
    const {success} = UserSignupSchema.safeParse({username, email, password});
    if(!success){
        throw new ApiError(409, "Invaliid creds");
    }
    const existingUser = await getUserByEmail(email);
    if(existingUser){
        throw new ApiError(403, "User already exists");
    }
    const pic = req.file;
    let picUrl = "";
    let picPublicId="";
    if(pic){
        const res = await upload(pic.path);
        picUrl = res.url;
        picPublicId = res.publicId;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({username, email, password:hash, pic:picUrl, publicId:picPublicId});
    if(!user){
        throw new ApiError(500);
    }
    const token = jwt.sign({id:user.id}, config.jwtUserSecret);
    return res.status(201).cookie("auth_user_token", token).json(new ApiResponse(201, {user, token}, "User sent successfully"));
});

const signin = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const {email, password} = req.body;
    const {success} = UserSigninSchema.safeParse({email, password});
    if(!success){
        throw new ApiError(409, "Invaliid creds");
    }
    const existingUser = await getUserByEmail(email);
    if(!existingUser){
        throw new ApiError(403, "User doesn't exists");
    }
    const userHash = await getUserPassword(existingUser.id);
    const isPasswordCorrect = await bcrypt.compare(password, userHash || '');
    if(!isPasswordCorrect){
        throw new ApiError(401, "User password is incorrect");
    }
    const user = await getUserById(existingUser.id);
    if(!user){
        throw new ApiError(500);
    }
    const token = jwt.sign({id:user.id}, config.jwtUserSecret);
    return res.status(200).cookie("auth_user_token", token).json(new ApiResponse(200, {user, token}, "User logged in successfully"));
});

const getUser = asyncHandler(async(req:Request, res:Response, _:NextFunction)=>{
    const userId = req.userId;
    const user = await getUserById(userId || -1);
    return res.status(200).json(new ApiResponse(200, {user}, "User sent successfully"));
});

export {signup, signin, getUser};