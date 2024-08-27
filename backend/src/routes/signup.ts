import { Hono } from 'hono'
import {signupInput} from '@sahani_indrajit/blognpmpacakge'
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


const signupRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string
        JWT_SECRET:string
	}
}>()

signupRouter.post('/',async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body=await c.req.json()
        const inputBody=signupInput.safeParse(body)
        if(!inputBody.success){
            return c.json({
                msg:"invalid input"
            })
        }
        const existingUser=await prisma.user.findFirst({
            where:{
                email:inputBody.data.email
            }
        })
        
        if(existingUser){
            return c.json({
                msg:"User already exist"
            })
        }
        
        const hash=await bcrypt.hash(inputBody.data.password,10);
        const user=await prisma.user.create({
            data:{
                email:inputBody.data.email,
                password:hash,
                name:inputBody.data.name
            }
        })
        const payLoad={
            id: user.id
        }

        const token=await sign(payLoad,c.env.JWT_SECRET)
        setCookie(c,'jwtToken',token, { 
            path: '/', 
            expires: new Date(Date.now() + 900000), 
            httpOnly: true 
          })
       
        return c.json({
            msg:"user created sucessfull"
        })
    }
    catch{
        return c.json({
            msg:"Internal Error!"
        })
    }
})

export default signupRouter
