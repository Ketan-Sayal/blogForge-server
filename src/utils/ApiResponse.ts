class ApiResponse{
    data:any;
    success:boolean;
    message:string;
    statusCode:number;

    constructor(statusCode:number, data:any, message:string="Success"){
        this.data = data;
        this.success = statusCode<400;
        this.message = message;
        this.statusCode = statusCode;
    }
}

export {ApiResponse};