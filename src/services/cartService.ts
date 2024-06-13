import { ItemToCar } from "@/types/itemsTypes"
import { cookies } from "next/headers"

async function getCookiesCart(value: string) {
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
    getCookiesCart
}