import { cookies } from "next/headers"
import * as jose from 'jose'
import { UserPayload } from "@/types/userTypes"
import { ItemToCar } from "@/types/itemsTypes"


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
    const cart = cookies().get('car')!.value
    const test:ItemToCar[] = JSON.parse(cart)
    const ids = test.map((item)=> item.id)

    const res = await fetch('http://localhost:3000/items/show-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids),
            cache: 'no-store'
        })
        const data = await res.json();

    console.log(data)
}


export const cookieService = {
    verifySession,
    setSession,
    addCarItem,
    getItemsCart
}