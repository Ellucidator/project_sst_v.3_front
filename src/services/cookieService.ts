import { cookies } from "next/headers"
import * as jose from 'jose'
import { UserPayload } from "@/types/userTypes"
import { Item, ItemPromotion, ItemToCar } from "@/types/itemsTypes"
import { revalidateTag } from "next/cache"
import { SubCategories } from "@/types/catalogTypes"



const verifyRegister = async () => {

    const cookieValue = cookies().get('register')?.value
    const req = await fetch('http://localhost:3000/verify-register', {
        cache: 'no-store',
        next: {
            tags: ['verify-register']
        },

    })
    if (cookieValue) {
        return await JSON.parse(cookieValue)
    } else {
        return {
            email: false,
            password: false
        }
    }
}
const verifyLogin = async () => {
    const cookieValue = cookies().get('login')?.value

    if (cookieValue) {
        return await JSON.parse(cookieValue)
    } else {
        return {
            error: null
        }
    }
}
const verifySession = async () => {

    const cookieValue = cookies().get('token')?.value
    if (cookieValue) {

        try {

            const verifyServer = await fetch('http://localhost:3000/verify-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: cookieValue }),
                cache: 'no-store',
                next: {
                    tags: ['verify-login']
                }
            })

            const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
            const { payload }: { payload: UserPayload } = await jose.jwtVerify(cookieValue, secret)

            if (typeof payload === 'string' || typeof payload === 'undefined' || !verifyServer.ok) return false

            return payload

        } catch (error) {
            return false
        }

    } else {
        return false
    }

}

const setSession = async (email: string, password: string) => {
    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            cache: 'no-store'
        })
        const data = await res.json();


        if (data.token) {
            cookies().set('token', data.token, {
                maxAge: 60 * 60 * 24,
            })
            return true
        }

        revalidateTag('user-info')
        return data

    } catch (error) {
        return false
    }
}

const addCarItem = async (inStock: number, item: ItemToCar) => {

    const cart = cookies().get('car')?.value
    if (!cart) {
        cookies().set('car', JSON.stringify([item]),
            {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            }
        )
    } else {
        const cartItems: ItemToCar[] = JSON.parse(cart)
        const verifyItem = cartItems.find(elem => elem.id === item.id)

        if (verifyItem) {
            verifyItem.quantity = (verifyItem.quantity + item.quantity) > inStock ? inStock : (verifyItem.quantity + item.quantity)
        } else {
            cartItems.push(item)
        }

        cookies().set('car', JSON.stringify(cartItems),
            {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            }
        )
    }



}

async function getItemsCart() {
    const cart = cookies().get('car')?.value
    if (!cart) return null

    const cookieCart: ItemToCar[] = JSON.parse(cart)
    const ids = cookieCart.map((item) => item.id)

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
    const data: ItemPromotion[] = await res.json();

    for (let i = 0; i < data.length; i++) {
        const item = data.find((item) => item.id === cookieCart[i].id)
        if (!item!.ItemCharacteristic) {
            item!.ItemCharacteristic = {
                id: item!.id,
                width: 0,
                height: 0,
                length: 0,
                weight: 0,
                insurance_value: 0,
                quantity: 0
            }
        }
        if (item) {
            if (item.in_stock < cookieCart[i].quantity) {
                item.ItemCharacteristic!.quantity = item.in_stock
            } else {
                item.ItemCharacteristic!.quantity = cookieCart[i].quantity
            }
        }
    }

    return data
}


async function setCookiePage(page: string) {
    'use server'
    cookies().set('page', page, {
        maxAge: 0
    })
}


async function getItensBySubCategoryServ(subCategoryId: string) {


    let page = cookies().get('page')?.value
    if (!page) page = '1'

    let itemsOrder: string = 'created_at-DESC'
    let tags: string[] = []

    const catalogCookie = cookies().get(`catalog${subCategoryId}`)?.value
    
    if (catalogCookie) {
        const catalogCookieOn: { itemsOrder?: string, tags?: string[] } = JSON.parse(catalogCookie)

        if (catalogCookieOn.itemsOrder) itemsOrder = catalogCookieOn.itemsOrder
        if (catalogCookieOn.tags) tags = catalogCookieOn.tags
    }


    if (tags.length > 0) {
        const res = await fetch(`http://localhost:3000/tag-values/${subCategoryId}?order=${itemsOrder}&page=${page}`, {
            next: {
                revalidate: 10
            },
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            method: 'POST',
            body: JSON.stringify({ tags })
        })
        const data: SubCategories = await res.json();
        return data;
    } else if(!(parseInt(subCategoryId) > 0)){

        const res = await fetch(`http://localhost:3000/items/search?name=${subCategoryId}&order=${itemsOrder}&page=${page}`,{
            next: {
                revalidate: 10
            },
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            method: 'GET',
        })
        const data: SubCategories = await res.json();
        return data

    } else {
        const res = await fetch(`http://localhost:3000/sub-categories/${subCategoryId}?order=${itemsOrder}&page=${page}`, {
            next: {
                revalidate: 10
            },
            cache: 'no-cache'
        })
        const data: SubCategories = await res.json();
        return data;
    }

}



export const cookieService = {
    verifySession,
    setSession,
    addCarItem,
    getItemsCart,
    verifyRegister,
    verifyLogin,
    setCookiePage,
    getItensBySubCategoryServ
}