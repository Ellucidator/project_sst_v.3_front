import { cookies } from "next/headers"
import { ItemPromotion, ItemToCar } from "@/types/itemsTypes"


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
async function updateCart(value: string) {
    'use server'
    const [itemId, btnValue, inStock] = value.split('/')

    const cookieValidation = cookies().get('car')?.value
    if (!cookieValidation) return

    const carCookie: ItemToCar[] = JSON.parse(cookieValidation)

    const itemVerify = carCookie.find((elem) => elem.id === parseInt(itemId))


    if (btnValue === '-') itemVerify!.quantity = itemVerify!.quantity - 1
    else if (btnValue === '+') itemVerify!.quantity = itemVerify!.quantity + 1
    else if (btnValue === 'x') itemVerify!.quantity = 0

    if (itemVerify!.quantity > 0) {
        if (itemVerify!.quantity > parseInt(inStock)) return

        cookies().set('car', JSON.stringify(carCookie))

    } else {
        cookies().set('car', JSON.stringify(carCookie.filter((elem) => elem.id !== parseInt(itemId))))
    }
}

export const cartServices = {
    updateCart,
    addCarItem,
    getItemsCart
}