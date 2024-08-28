import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const deleteBlogRoute=new Hono<{
    Bindings: {
		DATABASE_URL: string
        JWT_SECRET:string
	},
    Variables : {
        userId: string
    }
}>()

deleteBlogRoute.delete('/',async(c)=>{
    try{
        const id = c.req.param("id")
        const userID=c.get('userId')
        if(!id){
            return c.json({
                msg:"ID missing"
            })
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const deleteBlog = await prisma.blog.delete({
            where: {
              id: id,
              authorID:userID
            },
        })
        
        return c.json({
            msg:"Blog Deleted"
        })

    }
    catch(e:any){
        return c.json({
            msg: "Error deleting blog",
            error: e.message || "An unknown error occurred"
        }, 500);
    }

})

export default deleteBlogRoute