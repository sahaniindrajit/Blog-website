import { Hono } from 'hono'
import signupRouter from './signup'
import signinRouter from './signin'
import auth from './auth'
import blogPostRouter from './blogPost'
import blogUpdateRouter from './blogUpdate'

const router = new Hono<{Variables : {
    userId: string
}}>()

router.route('/signup',signupRouter)
router.route('/signin',signinRouter)

router.use('/blog/*',auth)

router.route('/blog',blogPostRouter)
router.route('/blog',blogUpdateRouter)



router.put('/blog',(c)=>{
    return c.text('ki')
})

router.get('/blog/:id?',(c)=>{
    console.log(c.get('userId'));
    const id=c.req.param('id')
    return c.text('joi')
})


export default router
