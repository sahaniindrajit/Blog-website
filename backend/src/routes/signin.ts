import { Hono } from 'hono'
import {signinInput} from '@sahani_indrajit/blognpmpacakge'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import bcrypt from 'bcryptjs'
import {
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    deleteCookie,
 } from 'hono/cookie'


const signinRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string
        JWT_SECRET:string
	}
}>()


signinRouter.post('/',async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const body=await c.req.json()
        const inputBody=signinInput.safeParse(body)
        if(!inputBody.success){
            return c.json({
                msg:"invalid input"
            })
        }
        const hashPassword=inputBody.data.password;

        const existingUser=await prisma.user.findUnique({
            where:{
                email:inputBody.data.email
            }
        })
        if(!existingUser){
            return c.json({
                msg:"User does't exist"
            })
        }
        const unHashedPassword=await bcrypt.compare(hashPassword, existingUser.password);
        if(!unHashedPassword){
            return c.json({
                msg:"Password is incorrect!"
            })
        }

        const payLoad={
            id: existingUser.id
        }

        const token=await sign(payLoad,c.env.JWT_SECRET)
        setCookie(c,'jwtToken',token, { 
            path: '/', 
            expires: new Date(Date.now() + 900000), 
            httpOnly: true 
          })
       
        return c.json({
            msg:"Signin sucessfull"
        })

        

    }
    catch(e:any){
       
        return c.json({
            msg: "Internal server error!",
            error: e.message || "Unknown error"
        });
    }
})

export default signinRouter;