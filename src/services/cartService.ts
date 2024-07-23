import { cookies } from "next/headers"
import { Cart, ItemPromotion, ItemToCar } from "@/types/itemsTypes"


const addCarItem = async (inStock: number, item: ItemToCar) => {

    const cart = cookies().get('car')?.value
    if (!cart) {
        cookies().set('car', JSON.stringify({ items: [item], total: item.price * item.ItemCharacteristics.quantity }),
            {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            }
        )
    } else {
        const cartItems: Cart = JSON.parse(cart)
        const verifyItem = cartItems.items.find(elem => elem.id === item.id)

        if (verifyItem) {
            if ((verifyItem.ItemCharacteristics.quantity + item.ItemCharacteristics.quantity) > inStock) return

            verifyItem.ItemCharacteristics.quantity += item.ItemCharacteristics.quantity
            cartItems.total += item.price

        } else {
            cartItems.items.push(item)
            cartItems.total += item.price
        }

        cookies().set('car', JSON.stringify(cartItems),
            {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            }
        )
    }



}

async function getItemsCart(): Promise<[ItemPromotion[], number]> {
    const cart = cookies().get('car')?.value
    if (!cart) return [[],0]

    const cookieCart: Cart = JSON.parse(cart)
    const ids = cookieCart.items.map((item) => item.id)
    
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
        const item = data.find((item) => item.id === cookieCart.items[i].id)
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
            if (item.in_stock < cookieCart.items[i].quantity) {
                item.ItemCharacteristic!.quantity = item.in_stock
            } else {
                item.ItemCharacteristic!.quantity = cookieCart.items[i].quantity
            }
        }
    }

    return [data,cookieCart.total]
}
async function updateCart(value: string) {
    'use server'
    const [itemId, btnValue, inStock] = value.split('/')

    const cookieValidation = cookies().get('car')?.value
    if (!cookieValidation) return

    const carCookie: Cart = JSON.parse(cookieValidation)

    const itemVerify = carCookie.items.find((elem) => elem.id === parseInt(itemId))


    if (btnValue === '-'){
        itemVerify!.quantity = itemVerify!.quantity - 1
        carCookie.total = carCookie.total - itemVerify!.price
    } 
    else if (btnValue === '+'){
        itemVerify!.quantity = itemVerify!.quantity + 1
        carCookie.total = carCookie.total + itemVerify!.price
    } 
    else if (btnValue === 'x'){
        carCookie.total = carCookie.total - (itemVerify!.price * itemVerify!.quantity)
        carCookie.items = carCookie.items.filter((elem) => elem.id !== parseInt(itemId))
        itemVerify!.quantity = 0
    } 

    if (itemVerify!.quantity > 0) {
        if (itemVerify!.quantity > parseInt(inStock)) return

        cookies().set('car', JSON.stringify(carCookie))

    } else {
        cookies().set('car', JSON.stringify(carCookie))
    }
}

export const cartServices = {
    updateCart,
    addCarItem,
    getItemsCart
}