import { Hono } from "hono";
import { blogInput } from "@sahani_indrajit/blognpmpacakge";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const blogPostRouter=new Hono<{
    Bindings: {
		DATABASE_URL: string
        JWT_SECRET:string
	},
    Variables : {
        userId: string
    }
}>()

blogPostRouter.post('/',async (c)=>{
    
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body=await c.req.json()
        const inputBody=blogInput.safeParse(body);
        if(!inputBody.success){
            return c.json({
                msg:"invalid input"
            })
        }
        const userID=c.get('userId')
        const post = await prisma.blog.create({
            data: {
                title: inputBody.data.title,
                content: inputBody.data.content,
                authorID:userID
            }
        });
        return c.json({
            msg:"Blog added successfully",
            id: post.id
        });
    }
    catch(e:any){
        return c.json({
            msg: "Internal server error!",
            error: e.message || "Unknown error"
        });
    }

    
})

export default blogPostRouter