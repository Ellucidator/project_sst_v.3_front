import { CreateUser } from "@/types/userTypes";
import { cookieService } from "./cookieService";
import { Avaliation, CreateAvaliation } from "@/types/avaliationTypes";


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

const getAvaliationByUserId = async()=>{
    const user = await cookieService.verifySession()
    if(!user) return false
    
    try {
        const avaliation = await fetch(`http://localhost:3000/user/${user.id}/avaliation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            next: {
                revalidate: 10,
                tags: ['avaliation-user'],
            },
        })

        const data:Avaliation = await avaliation.json();
        return data

    } catch (error) {
        if(error) return false
    }

}

async function getUserAdresses(){

    const adresses = await fetch(`http://localhost:3000/user/addresses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRyYWRlZmoxM0Bob3RtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNYXJjZWxvIiwiaW1nVXJsIjpudWxsLCJpYXQiOjE3MTU3OTMyNTIsImV4cCI6MTcxNTgyMjA1Mn0.Q0gqyuXJwEzE3V1VKDPgMh035c00WoHnuPz98GgiVJs`
        },
        
        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['adresses-user'],
        },
    })

    const data = await adresses.json();
    console.log(data)
    return data
}

export const userService = {
    createUser,
    createAvaliation,
    getAvaliationByUserId,
    getUserAdresses
}