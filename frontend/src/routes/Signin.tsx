import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios  from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signin() {

  const [email,setEmail]=useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate=useNavigate()
  


  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#0c0c0c] to-secondary">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Signin</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" onClick={async () => {
              try {
                
                await axios.post(`${API_BASE_URL}/signin`, {
                  email,
                  password
                    
                }, 
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  withCredentials: true,
                })

                navigate('/blog')
                
              }
              catch (e) {
                alert(e);
                navigate('/failed')

              }
            }}>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}