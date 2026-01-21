import type { Response, Request, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.js"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { config } from "../config/index.js";
import { getUserById } from "../services/user.service.js";
import { ROLES } from "../lib/prisma.js";

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

export const isAdmin = async(req:Request, res:Response, next:NextFunction)=>{
     try {
        const token = req.headers.authorization_admin || req.cookies.auth_admin_token;
        if(!token){
            throw new ApiError(403);
        }
        const decoded = jwt.verify(token, config.jwtAdminSecret) as JwtPayload;
        const user = await getUserById(parseInt(decoded.id));
        if(!user){
            throw new ApiError(403);
        }
        if(user.role!==ROLES.ADMIN){
            throw new ApiError(404);
        }
        req.userId = user.id;
        next();
    } catch (error) {
        res.status(403).json(new ApiError(403, "Admin must login"));
    }
}

export const isEditor = async(req:Request, res:Response, next:NextFunction)=>{
     try {
        const token = req.headers.authorization_editor || req.cookies.editor_token;
        if(!token){
            throw new ApiError(403);
        }
        const decoded = jwt.verify(token, config.jwtEditorSecret) as JwtPayload;
        const user = await getUserById(parseInt(decoded.id));
        if(!user){
            throw new ApiError(403);
        }
        if(user.role!==ROLES.EDITOR){
            throw new ApiError(404);
        }
        req.userId = user.id;
        next();
    } catch (error) {
        res.status(403).json(new ApiError(403, "Admin must login"));
    }
}

export const isContributor = async(req:Request, res:Response, next:NextFunction)=>{
     try {
        const token = req.headers.authorization_contributor || req.cookies.contributor_token;
        if(!token){
            throw new ApiError(403);
        }
        const decoded = jwt.verify(token, config.jwtContributorSecret) as JwtPayload;
        const user = await getUserById(parseInt(decoded.id));
        if(!user){
            throw new ApiError(403);
        }
        if(user.role!==ROLES.CONTRIBUTOR){
            throw new ApiError(404);
        }
        req.userId = user.id;
        next();
    } catch (error) {
        res.status(403).json(new ApiError(403, "Admin must login"));
    }
}

export const isAurthor = async(req:Request, res:Response, next:NextFunction)=>{
     try {
        const token = req.headers.authorization_aurthor || req.cookies.aurthor_token;
        if(!token){
            throw new ApiError(403);
        }
        const decoded = jwt.verify(token, config.jwtAurthorSecret) as JwtPayload;
        const user = await getUserById(parseInt(decoded.id));
        if(!user){
            throw new ApiError(403);
        }
        if(user.role!==ROLES.AURTHOR){
            throw new ApiError(404);
        }
        req.userId = user.id;
        next();
    } catch (error) {
        res.status(403).json(new ApiError(403, "Admin must login"));
    }
}