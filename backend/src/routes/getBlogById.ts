import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const getBlogBytIdRouter=new Hono<{
    Bindings: {
		DATABASE_URL: string
        JWT_SECRET:string
	},
    Variables : {
        userId: string
    }
}>()

getBlogBytIdRouter.get('/bulk',async (c)=>{

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blog=await prisma.blog.findMany();
        if(!blog){
            return c.json({
                msg:"No blog"
            })
        }
        return c.json({
            blog:blog
        });

    }
    catch(e:any){
        return c.json({
            msg: "Error getting blog",
            error: e.message || "An unknown error occurred"
        }, 500);
    }

})

getBlogBytIdRouter.get('/:id',async (c)=>{

    try{
        
        const id = c.req.param("id")
        if(!id){
            return c.json({
                msg:"ID missing"
            })
        }

        
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blog=await prisma.blog.findUnique({
            where:{
                id:id
            }
        })
        if(!blog){
            return c.json({
                msg:"Could't find the blog"
            })
        }
        return c.json({
            blog:blog
        });

    }
    catch(e:any){
        return c.json({
            msg: "Error getting blog",
            error: e.message || "An unknown error occurred"
        }, 500);
    }

})

export default getBlogBytIdRouter