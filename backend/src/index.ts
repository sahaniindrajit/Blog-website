import { Hono } from 'hono'
import router from './routes/route'
import { cors } from 'hono/cors'

const app = new Hono()
app.use(
    '/api/v1/*',
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  )
  

app.route('/api/v1',router)

export default app
