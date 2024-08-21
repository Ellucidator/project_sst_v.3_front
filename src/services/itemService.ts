import { helpers } from "@/helpers/helpers";
import { AvaliationAndCount } from "@/types/avaliationTypes";
import { ItemCharacteristics, ItemFull } from "@/types/itemsTypes";

async function getOneItem(itemId:string) {

    const item: ItemFull = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + `/items/${itemId}`,'default',10,['one-item'])
    
    return item
}

async function getItemCharacteristics(itemId:string) {
    const characteristics: ItemCharacteristics = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + `/item/${itemId}/characteristics`,'default',10)
    
    return characteristics
}
async function getAllAvaliationsByItemId(itemId:string) {
    let page = helpers.getCookieIsNumber('page')

    const avaliations: AvaliationAndCount = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + `/item/${itemId}/avaliations?page=${page}`,'default',10,['all-avaliations-item'])

    return avaliations
}


export const itemService = {
    getAllAvaliationsByItemId,
    getOneItem,
    getItemCharacteristics
}

