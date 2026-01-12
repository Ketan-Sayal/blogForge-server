import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../services/user.service.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { UserSignupSchema } from "../validators/user.validator.js";
import { ApiError } from "../utils/ApiError.js";
import { config } from "../config/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({username, email, password:hash});
    const token = jwt.sign({id:user.id}, config.jwtUserSecret);
    return res.status(201).json(new ApiResponse(201, {user, token}, "User sent successfully"));
});

export {signup};