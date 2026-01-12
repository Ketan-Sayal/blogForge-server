import type { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError.js";

const asyncHandler = (fn:(req:Request, res:Response, next:NextFunction)=>Promise<Response | void>)=>{
    return async(req:Request, res:Response, next:NextFunction)=>{
        try {
            await fn(req, res, next);
        } catch (error) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json(new ApiError(error.statusCode, error.message));
            }
            return res.status(500).json(new ApiError(500));
        }
    }
}

export {asyncHandler};