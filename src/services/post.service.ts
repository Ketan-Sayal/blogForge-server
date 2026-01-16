import {prisma as client} from "../lib/prisma.js";
import type { IPost } from "../types/index.js";
import { pushCategoryToPost } from "./category.service.js";

export const blockPost = async(postId:number)=>{
    
    try {
        const res = await client.post.update({
        where:{
            id:postId
        },
        data:{
            published:false
        }
    });
    return res;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}

export const deletePost = async(postId:number)=>{
    
    try {
        await client.post.delete({
        where:{
            id:postId
        }
    });
    return true;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return false;
        }
        console.log(error);
        return false;
    }
}

export const unblockPost = async(postId:number)=>{
    
    try {
        const res = await client.post.update({
        where:{
            id:postId
        },
        data:{
            published:true
        }
    });
    return res;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}

export const createPost = async (data: IPost) => {
  try {
    return await client.$transaction(async (tx) => {

      const newPost = await tx.post.create({
        data: {
          title: data.title,
          content: data.content ?? "",
          userId: data.userId,
          publishDate: data.publishedDate,
        }
      });

      const postCategories = data.categories.map((id) => ({
        postId: newPost.id,
        categoryId: id
      }));

      await tx.postCategory.createMany({
        data: postCategories
      });

      return newPost;
    });

  } catch (error) {
    console.log(error);
    return null;
  }
};
