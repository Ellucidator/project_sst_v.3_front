import { helpers } from "@/helpers/helpers";
import { AvaliationAndCount } from "@/types/avaliationTypes";
import { ItemCharacteristics, ItemFull } from "@/types/itemsTypes";

async function getOneItem(itemId:string) {
    const res = await fetch(process.env.API_HOST + `/items/${itemId}`, {
        next:{
            revalidate: 10,
            tags: ['one-item']
        },
        cache: 'no-store'
    })


    const data: ItemFull = await res.json();
    return data;
}

async function getItemCharacteristics(itemId:string) {
    const res = await fetch(process.env.API_HOST + `/item/${itemId}/characteristics`, {
        next:{
            revalidate: 10,
        },
        cache: 'no-store'
    })


    const data: ItemCharacteristics = await res.json();

    return data;
}
async function getAllAvaliationsByItemId(itemId:string) {
    let page = helpers.getCookieIsNumber('page')

    const res = await fetch(process.env.API_HOST + `/item/${itemId}/avaliations?page=${page}`, {
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

