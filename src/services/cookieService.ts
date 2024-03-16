import { cookies } from "next/headers"
import * as jose from 'jose'
import { UserPayload } from "@/types/userTypes"


const verifySession = async ()=>{

    const cookieValue = cookies().get('token')
    if(cookieValue){
        
        try {
            const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
            const {payload}: {payload: UserPayload} = await jose.jwtVerify(cookieValue.value, secret)

            if(payload){
                return payload
            }
        } catch (error) {
            if(error instanceof Error){
                return error.message
            }
        }

    }else{
        return false
    }

}

const setSession = async (email:string, password:string)=>{
    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    })
    const {token} = await res.json();
    console.log(token)
    if(token){
        cookies().set('token', token, {
            maxAge: 60*60*24,
        })
        return true
    }
    return false
}


export const cookieService = {
    verifySession,
    setSession
}