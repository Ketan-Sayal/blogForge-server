import {prisma as client} from "../lib/prisma.js";
import type { IPostCategory } from "../types/index.js";

export const pushCategoryToPost = async({postId, categories}:{postId:number, categories:number[]})=>{
    const postsCategoriesData:IPostCategory[] = [];
    categories.forEach((id)=>{
        const postCategory = {
            categoryId:id,
            postId
        }
        postsCategoriesData.push(postCategory);
    })
    try {
        await client.postCategory.createMany({
            data:postsCategoriesData
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