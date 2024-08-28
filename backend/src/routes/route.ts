import { Hono } from 'hono'
import signupRouter from './signup'
import signinRouter from './signin'
import auth from './auth'
import blogPostRouter from './blogPost'
import blogUpdateRouter from './blogUpdate'
import getBlogBytIdRouter from './getBlogById'

const router = new Hono<{Variables : {
    userId: string
}}>()

router.route('/signup',signupRouter)
router.route('/signin',signinRouter)

router.use('/blog/*',auth)

router.route('/blog',blogPostRouter)
router.route('/blog',blogUpdateRouter)
router.route('/blog',getBlogBytIdRouter)



export default router
