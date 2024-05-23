import { CreateUser, UserAddress, UserFavorite } from "@/types/userTypes";
import { cookieService } from "./cookieService";
import { Avaliation, CreateAvaliation } from "@/types/avaliationTypes";
import { Purchase, Purchases } from "@/types/purchaseTypes";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";


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

    const token = cookies().get('token')?.value
    if(!token) return false

    const adresses = await fetch(`http://localhost:3000/user/addresses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        
        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['adresses-user'],
        },
    })

    const data:UserAddress[] = await adresses.json();
    return data
}

async function deleteUserAddress(id:string){
    'use server'
    const token = cookies().get('token')?.value
    if(!token) return 

    await fetch(`http://localhost:3000/user/address/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    revalidateTag('adresses-user')
}
async function activeUserAddress(id:string){
    'use server'
    const token = cookies().get('token')?.value
    if(!token) return 

    await fetch(`http://localhost:3000/user/address/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    revalidateTag('adresses-user')
}
async function getUserPurchases(page:number = 1,perPage:number = 10){
    
    const token = cookies().get('token')?.value
    if(!token) return false

    const purchases = await fetch(`http://localhost:3000/user/show/purchases?page=${page}&perPage=${perPage}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        
        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['purchases-user'],
        },
    })

    const data:Purchases = await purchases.json();
    return data
}

async function getUserPurchaseById(purchaseId:string){
    
    const token = cookies().get('token')?.value
    if(!token) return false

    const purchases = await fetch(`http://localhost:3000/user/show/purchase/${purchaseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        
        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['one-purchase-user'],
        },
    })

    const data:Purchase = await purchases.json();
    return data
}

async function getUserFavorites(page:number = 1,perPage:number = 10){
    
    const token = cookies().get('token')?.value
    if(!token) return false

    const purchases = await fetch(`http://localhost:3000/user/show/favorites?page=${page}&perPage=${perPage}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        
        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['favorites-user'],
        },
    })

    const data:UserFavorite[] = await purchases.json();
    return data
}

export const userService = {
    createUser,
    createAvaliation,
    getAvaliationByUserId,
    getUserAdresses,
    deleteUserAddress,
    activeUserAddress,
    getUserPurchases,
    getUserPurchaseById,
    getUserFavorites
}