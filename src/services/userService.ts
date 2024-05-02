import { CreateUser } from "@/types/userTypes";
import { cookieService } from "./cookieService";
import { CreateAvaliation } from "@/types/avaliationTypes";


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
        return false
    }
}

const createAvaliation = async(avaliation:CreateAvaliation)=>{
    try {
        const res = await fetch('http://localhost:3000/item/create-avaliation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avaliation),
            cache: 'no-store'
        })

        const data = await res.json();

        return data
    } catch (error) {
        return false
    }
}

export const userService = {
    createUser,
    createAvaliation
}