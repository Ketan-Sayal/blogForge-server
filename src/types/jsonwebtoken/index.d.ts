import type {JwtPayload} from "jsonwebtoken";
declare global {
    interface JwtPayload implements JwtPayload {
        id?: number;
    }
}

export {};