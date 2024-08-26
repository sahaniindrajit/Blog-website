import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



const router = new Hono<{
    Bindings: {
		DATABASE_URL: string
	}
}>()

router.get('/home', (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    return c.text('Hello Hono!')
})

router.post('/signin',(c)=>{
    return c.text("hello")
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
