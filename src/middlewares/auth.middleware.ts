import type { Response, Request, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.js"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { config } from "../config/index.js";
import { getUserById } from "../services/user.service.js";

export const isLoggedIn = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const token = req.headers.authorization || req.cookies.auth_user_token;
        if(!token){
            throw new ApiError(403);
        }
        const decoded = jwt.verify(token, config.jwtUserSecret) as JwtPayload;
        const user = await getUserById(parseInt(decoded.id));
        if(!user){
            throw new ApiError(403);
        }
        req.userId = user.id;
        next();
    } catch (error) {
        res.status(403).json(new ApiError(403, "User must login"));
    }
}