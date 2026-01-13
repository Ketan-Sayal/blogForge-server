declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export {}; //imp to write this