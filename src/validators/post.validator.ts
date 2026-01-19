import z from "zod";

const PostSchema = z.object({
    title: z.string(),
    content: z.string(),
    categories: z.string(),
    publishedDate: z.date()
});

const PostUpdateSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export {PostSchema, PostUpdateSchema};