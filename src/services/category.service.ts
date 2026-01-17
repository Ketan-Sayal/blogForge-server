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

export const createCategory = async(type:string)=>{
    try {
        const category = await client.category.create({
            data:{
                type:type
            }
        });
        return category;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}

export const getPostCategories = async(postId:number)=>{
    try {
        const categories = await client.postCategory.findMany({
            where:{
                postId:postId
            },
            select:{
                category:true
            }
        });
        return categories;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return null;
        }
        console.log(error);
        return null;
    }
}