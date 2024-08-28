import { Hono } from 'hono'
import {deleteCookie} from 'hono/cookie'

const logoutRouter=new Hono()

logoutRouter.get('/',(c)=>{
    try{
        deleteCookie(c, 'jwtToken')
        return c.json({
            msg:"Cookies deleted"
        })
    }
    catch(e:any){
        return c.json({
            msg: "Error getting blog",
            error: e.message || "An unknown error occurred"
        }, 500);
    }
})

export default logoutRouter