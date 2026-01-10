class ApiError extends Error{
    data:null;
    success:boolean;
    message:string;
    statusCode:number;

    constructor(statusCode:number, message:string="Something went wrong", stack?:string){
        super(message);
        this.data = null;
        this.success = false;
        this.message = message;
        this.statusCode = statusCode;
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};