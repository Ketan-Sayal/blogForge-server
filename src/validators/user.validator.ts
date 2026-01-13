import z from "zod";

const UserSignupSchema = z.object({
    username:z.string(),
    email: z.email(),
    password: z.string()
});

const UserSigninSchema = z.object({
    email: z.email(),
    password: z.string()
});

export {UserSignupSchema, UserSigninSchema}