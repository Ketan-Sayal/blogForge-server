class ApiResponse{
    data:Object;
    success:boolean;
    message:string;
    statusCode:number;

    constructor(statusCode:number, data:Object, message:string="Success"){
        this.data = data;
        this.success = statusCode<400;
        this.message = message;
        this.statusCode = statusCode;
    }
}

export {ApiResponse};