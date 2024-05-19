import { CreateUser, UserAddress } from "@/types/userTypes";
import { cookieService } from "./cookieService";
import { Avaliation, CreateAvaliation } from "@/types/avaliationTypes";
import { Purchases } from "@/types/purchaseTypes";


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
            'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRyYWRlZmoxM0Bob3RtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNYXJjZWxvIiwiaW1nVXJsIjpudWxsLCJpYXQiOjE3MTYxMzk3ODYsImV4cCI6MTcxNjE2ODU4Nn0.vQdyCRqFGas7KMnI9L2_jWOT5Ez-I2I4-eXGPm0NjrM`
        },
        
        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['adresses-user'],
        },
    })

    const data:UserAddress[] = await adresses.json();
    console.log(data)
    return data
}
async function getUserPurchases(page:number = 1,perPage:number = 10){

    const purchases = await fetch(`http://localhost:3000/user/show/purchases?page=${page}&perPage=${perPage}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRyYWRlZmoxM0Bob3RtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNYXJjZWxvIiwiaW1nVXJsIjpudWxsLCJpYXQiOjE3MTYxMzk3ODYsImV4cCI6MTcxNjE2ODU4Nn0.vQdyCRqFGas7KMnI9L2_jWOT5Ez-I2I4-eXGPm0NjrM`
        },
        
        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['purchases-user'],
        },
    })

    const data:Purchases = await purchases.json();
    console.log(data)
    return data
}

export const userService = {
    createUser,
    createAvaliation,
    getAvaliationByUserId,
    getUserAdresses,
    getUserPurchases
}