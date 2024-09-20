import { helpers } from "@/helpers/helpers";
import { AvaliationAndCount } from "@/types/avaliationTypes";
import { ItemCharacteristics, ItemFull } from "@/types/itemsTypes";

async function getOneItem(itemId:string) {
    const item: ItemFull = await helpers.getSimpleRequestAndHandleError({
        url:process.env.API_HOST + `/items/${itemId}`,
        cache:'default',
        revalidate:60*2,
        tags:['one-item']
    })
    return item
}

async function getItemCharacteristics(itemId:string) {
    const characteristics: ItemCharacteristics = await helpers.getSimpleRequestAndHandleError({
        url:process.env.API_HOST + `/item/${itemId}/characteristics`,
        cache:'default',
        revalidate:60*60,
    })
    return characteristics
}
async function getAllAvaliationsByItemId(itemId:string) {
    let page = helpers.getCookieIsNumber('page')

    const avaliations: AvaliationAndCount = await helpers.getSimpleRequestAndHandleError({
        url:process.env.API_HOST + `/item/${itemId}/avaliations?page=${page}`,
        cache:'default',
        revalidate:10,
        tags:['all-avaliations-item']
    })
    return avaliations
}


export const itemService = {
    getAllAvaliationsByItemId,
    getOneItem,
    getItemCharacteristics
}

