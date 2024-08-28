import { cookies } from "next/headers"
import { Cart, ItemPromotion, ItemToCar } from "@/types/itemsTypes"
import { helpers } from "@/helpers/helpers"


const addCarItem = async (inStock: number, item: ItemToCar) => {

    const cart: Cart = helpers.getCookieValue('car')
    if (!cart) {
        cookies().set('car', JSON.stringify({ items: [item], total: item.price * item.ItemCharacteristics.quantity }),
            {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            }
        )
    } else {
        const verifyItem = cart.items.find(elem => elem.id === item.id)

        if (verifyItem) {
            if ((verifyItem.ItemCharacteristics.quantity + item.ItemCharacteristics.quantity) > inStock) return

            verifyItem.ItemCharacteristics.quantity += item.ItemCharacteristics.quantity
            cart.total += (item.price * item.ItemCharacteristics.quantity)

        } else {
            cart.items.push(item)
            cart.total += (item.price * item.ItemCharacteristics.quantity)
        }

        cookies().set('car', JSON.stringify(cart),
            {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            }
        )
    }



}

async function getItemsCart(): Promise<[ItemPromotion[], number, any]> {
    const cart: Cart = helpers.getCookieValue('car')
    if (!cart) return [[], 0, {}]
    
    const ids = cart.items.map((item) => item.id)

    try {
        const res = await fetch(process.env.API_HOST + '/items/show-cart', {
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
            const item = data.find((item) => item.id === cart.items[i].id)
            if (item) {
                item.ItemCharacteristic = cart.items[i].ItemCharacteristics

                if (item.in_stock < item.ItemCharacteristic.quantity) {
                    cart.total -= cart.items[i].price * (item.ItemCharacteristic.quantity - item.in_stock)
                    item.ItemCharacteristic.quantity = item.in_stock
                }
            }
        }
        console.log(data)
        return [data, cart.total, cart.frete]
    } catch (error) {
        return [[], 0, {}]
    }
}
async function updateCart(value: string) {
    'use server'
    const [itemId, btnValue, inStock] = value.split('/')

    const carCookie: Cart = helpers.getCookieValue('car')
    if (!carCookie) return

    const itemVerify = carCookie.items.find((elem) => elem.id === parseInt(itemId))

    if (btnValue === '-' && itemVerify!.ItemCharacteristics.quantity > 1) {
        itemVerify!.ItemCharacteristics.quantity = itemVerify!.ItemCharacteristics.quantity - 1
        carCookie.total = carCookie.total - itemVerify!.price
    }
    else if (btnValue === '+' && itemVerify!.ItemCharacteristics.quantity < parseInt(inStock)) {
        itemVerify!.ItemCharacteristics.quantity = itemVerify!.ItemCharacteristics.quantity + 1
        carCookie.total = carCookie.total + itemVerify!.price
    }
    else if (btnValue === 'x') {
        carCookie.total = carCookie.total - (itemVerify!.price * itemVerify!.ItemCharacteristics.quantity)
        carCookie.items = carCookie.items.filter((elem) => elem.id !== parseInt(itemId))
    }

    cookies().set('car', JSON.stringify(carCookie))

}

export const cartServices = {
    updateCart,
    addCarItem,
    getItemsCart
}