import { Hono } from "hono";
import { blogInput } from "@sahani_indrajit/blognpmpacakge";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const blogUpdateRouter=new Hono<{
    Bindings: {
		DATABASE_URL: string
        JWT_SECRET:string
	},
    Variables : {
        userId: string
    }
}>()

blogUpdateRouter.put('/',async (c)=>{
    
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

        const updatedBlog=await prisma.blog.update({
            where:{
                id: body.id,
			    authorID: userID
            },
            data:{
                title:inputBody.data.title,
                content:inputBody.data.content
            }
        })
        if(!updatedBlog){
            return c.json({
                msg:"Error! Updating the blog || Wrong user or post id"
            })
        }
        return c.json({
            msg:"Blog updated successfully",
            id: updatedBlog.id
        });
    }
    catch(e:any){
        
        if (e.code === 'P2025') {
            // P2025: Record to update not found
            return c.json({
            msg: "Error! Could not find the blog post or you're not the author."
            }, 404); 
        }

        return c.json({
            msg: "Failed to update blog",
            error: e.message || "An unknown error occurred"
        }, 500);
        
    }
})

export default blogUpdateRouter;