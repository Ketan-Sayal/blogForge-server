export type IUser = {
    username:string;
    email:string;
    password:string
}

export type IUpdatePassword = {
    email:string;
    password:string
}

export type IComment = {
    userId:number;
    postId:number;
    message:string
}

export type IUpdateComment = {
    id:number;
    message:string
}

export type IPost = {
    title: string;
    content?:string;
    userId:number;
    publishedDate:Date;
    categories:number[]
}

export type IPostCategory= {
    categoryId:number,
    postId:number
}