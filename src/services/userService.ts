import { CreateUser } from "@/types/userTypes";
import { cookieService } from "./cookieService";


const createUser = async(user:CreateUser)=>{
    
    try {
        const res = await fetch('http://localhost:3000/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            cache: 'no-store'
        })

        if(!res.ok) return false

        await cookieService.setSession(user.email, user.password)
        
        return true
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
        }
    }
}

export const userService = {
    createUser
}