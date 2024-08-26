import { Hono } from 'hono'
import { requestId } from 'hono/request-id'

const router = new Hono()

router.get('/home', (c) => {
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
