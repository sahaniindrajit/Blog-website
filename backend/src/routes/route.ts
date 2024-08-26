import { Hono } from 'hono'
import {userInput} from '@sahani_indrajit/blognpmpacakge'
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


const router = new Hono<{
    Bindings: {
		DATABASE_URL: string
        JWT_SECRET:string
	}
}>()

router.get('/home', (c)=> {

    return c.text('Hello Hono!')
})


router.post('/signup',async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body=await c.req.json()
        const inputBody=userInput.safeParse(body)
        if(!inputBody.success){
            return c.json({
                msg:"invalid input"
            })
        }
        const hash=await bcrypt.hash(inputBody.data.password,10)
        const user=await prisma.user.create({
            data:{
                email:inputBody.data.email,
                password:hash,
                name:inputBody.data.name
            }
        })
        if(!user){
            return c.json({
                msg:"Error! creating user"
            })
        }
        const payLoad={
            id: user.id
        }
        const token=await sign(payLoad,c.env.JWT_SECRET)
        setCookie(c,'jwtToken',token, { 
            path: '/', 
            expires: new Date(Date.now() + 900000), 
            httpOnly: true 
          })
       console.log(hash)
        return c.json({
            msg:"user created sucessfull"
        })
    }
    catch{
        return c.status(200)
    }
})


router.post('/signin',(c)=>{
    return c.text("hello")
})

router.post('/blog',(c)=>{
    return c.text('hi')
})

router.put('/blog',(c)=>{
    return c.text('ki')
})

router.get('/blog/:id',(c)=>{
    const id=c.req.param('id')
    return c.text('joi')
})


export default router
