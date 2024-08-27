import { Hono } from 'hono'
import signupRouter from './signup'
import signinRouter from './signin'

const router = new Hono()

router.route('/signup',signupRouter)
router.route('/signin',signinRouter)




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
