import { cookies } from "next/headers"
import * as jose from 'jose'
import { UserPayload } from "@/types/userTypes"
import { Item, ItemPromotion, ItemToCar } from "@/types/itemsTypes"
import { Console, error } from "console"



const verifyRegister = async ()=>{

    const cookieValue = cookies().get('register')?.value
    const req = await fetch('http://localhost:3000/verify-register', {
        cache: 'no-store',
        next: {
            tags: ['verify-register']
        },
        
    })
    if(cookieValue){
        return await JSON.parse(cookieValue)
    }else{
        return {
            email:false,
            password:false
        }
    }
}
const verifyLogin = async ()=>{
    const cookieValue = cookies().get('login')?.value
    const req = await fetch('http://localhost:3000/verify-login', {
        cache: 'no-store',
        next: {
            tags: ['verify-login']
        },
        
    })
    if(cookieValue){
        return await JSON.parse(cookieValue)
    }else{
        return {
            error:null
        }
    }
}
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

const addCarItem = async (item:ItemToCar)=>{
    const setCar:ItemToCar[] = []
    setCar.push(item)
    
    
    const car = cookies().get('car')
    if(car){
        const verifyCar:ItemToCar[] = JSON.parse(car.value)

        const verifyItem = verifyCar.find((ic)=> ic.id === item.id)

        if(verifyItem){
            verifyItem.quantity += item.quantity 
            cookies().set('car', JSON.stringify(verifyCar))
        }else{
            verifyCar.push(item)
            cookies().set('car', JSON.stringify(verifyCar))
        }

    }else{
        const test = cookies().set('car', JSON.stringify(setCar),
        {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) ,
        })
    }
    

    
}

async function getItemsCart() {
    const cart = cookies().get('car')?.value
    if(!cart) return null

    const cookieCart:ItemToCar[] = JSON.parse(cart)
    const ids = cookieCart.map((item)=> item.id)

    const res = await fetch('http://localhost:3000/items/show-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids),
            cache: 'no-store',
            next: {
                tags: ['get-items-cart']
            }
        })
    const data:ItemPromotion[] = await res.json();

    for(let i = 0; i < data.length; i++){
        const item = data.find((item)=> item.id === cookieCart[i].id)

        if(item){
            if(item.in_stock < cookieCart[i].quantity){
                item.ItemCharacteristic!.quantity = item.in_stock
            }else{
                item.ItemCharacteristic!.quantity = cookieCart[i].quantity
            }
        }
    }
    
    return data
}


export const cookieService = {
    verifySession,
    setSession,
    addCarItem,
    getItemsCart,
    verifyRegister,
    verifyLogin
}