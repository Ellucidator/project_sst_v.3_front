import { cookies } from "next/headers"
import * as jose from 'jose'

const verifySession = async ()=>{

    const cookieValue = cookies().get('token')
    if(cookieValue){

        try {
            const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
            const {payload} = await jose.jwtVerify(cookieValue.value, secret)
            
            return payload
        } catch (error) {
            if(error instanceof Error){
                return error.message
            }
        }

    }else{
        return false
    }

}


export const cookieService = {
    verifySession,
}