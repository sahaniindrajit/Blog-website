import { Hono } from 'hono'
import { Context, Next } from 'hono';

import { decode, sign, verify } from 'hono/jwt'
import bcrypt from 'bcryptjs'
import {
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    deleteCookie,
} from 'hono/cookie'



const auth=async (c:Context,next:Next)=>{
    try{
        const jwt = getCookie(c,"jwtToken")
        if (!jwt) {
            c.status(401);
            return c.json({ error: "Unauthorized: Missing token" });
        }
        const payload = await verify(jwt, c.env.JWT_SECRET);
        
        if (!payload || !payload.id) {
            c.status(401);
            return c.json({ error: "Unauthorized: Invalid token" });
          }
        c.set("userId",payload.id as string)
        await next()
    }
    catch(e:any){
        return c.json({
            msg: "Internal server error!",
            error: e.message || "Unknown error"
        });
    }
}


export default auth;