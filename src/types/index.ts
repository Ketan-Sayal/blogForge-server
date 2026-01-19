export type IConfig = {
    port:number;
    jwtUserSecret:string;
    cloudinaryApiKey:string;
    cloudinaryApiSecret:string;
    cloudName:string;
    jwtAdminSecret:string;
    jwtAurthorSecret:string;
    jwtContributorSecret:string;
    jwtEditorSecret:string;
}

export type IUser = {
    username:string;
    email:string;
    password:string;
    pic?:string;
    publicId?:string;
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
    categoryId:number;
    postId:number
}

export type IUpdatePost = {
    id:number;
    title: string;
    content?:string;
}

export type IID = {
    id:number;
}

export type IUsername = Pick<IUser, "email"| "username">;

export type IContent = Pick<IUpdatePost, "id" | "content">;

export type IUpdateUserPic = Pick<IUser, "pic" | "publicId"> & IID;