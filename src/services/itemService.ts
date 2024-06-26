import { AvaliationAndCount } from "@/types/avaliationTypes";
import { ItemCharacteristics, ItemFull } from "@/types/itemsTypes";
import { cookies } from "next/headers";

async function getOneItem(itemId:string) {
    const res = await fetch(`http://localhost:3000/items/${itemId}`, {
        next:{
            revalidate: 10,
        },
        cache: 'no-store'
    })


    const data: ItemFull = await res.json();
    return data;
}

async function getItemCharacteristics(itemId:string) {
    const res = await fetch(`http:/localhost:3000/item/${itemId}/characteristics`, {
        next:{
            revalidate: 10,
        },
        cache: 'no-store'
    })


    const data: ItemCharacteristics = await res.json();

    return data;
}
async function getAllAvaliationsByItemId(itemId:string) {
    let page = 1
    const pageCookie = cookies().get('page')?.value
    if (pageCookie) page = parseInt(pageCookie)


    const res = await fetch(`http://localhost:3000/item/${itemId}/avaliations?page=${page}`, {
        next:{
            revalidate: 10,
            tags: ['all-avaliations-item']
        },
        cache: 'no-cache'
    })
    const data: AvaliationAndCount = await res.json();
    return data;
}


export const itemService = {
    getAllAvaliationsByItemId,
    getOneItem,
    getItemCharacteristics
}

