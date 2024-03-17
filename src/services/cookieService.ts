import { cookies } from "next/headers"
import * as jose from 'jose'
import { UserPayload } from "@/types/userTypes"


const verifySession = async ()=>{

    const cookieValue = cookies().get('token')
    if(cookieValue){
        
        try {
            const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
            const {payload}: {payload: UserPayload} = await jose.jwtVerify(cookieValue.value, secret)

            if(typeof payload === 'string' || typeof payload === 'undefined')false

            return payload

        } catch (error) {
                return false
        }

    }else{
        return false
    }

}

const setSession = async (email:string, password:string)=>{
    console.log(email, password)
    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password}),
            cache: 'no-store'
        })
        const data = await res.json();
    
        if(data.token){
            cookies().set('token', data.token, {
                maxAge: 60*60*24,
            })
            return true
        }
        return data

    } catch (error) {
        return false
    }
}


export const cookieService = {
    verifySession,
    setSession
}