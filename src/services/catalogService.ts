import { helpers } from "@/helpers/helpers";
import { Categories, SubCategories } from "@/types/catalogTypes";
import { Item } from "@/types/itemsTypes";
import { Promotion, PromotionWithItems } from "@/types/promotionsTypes";
import { Tag } from "@/types/tagTypes";

async function getCatalog() {
    const categories: Categories[] = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + '/categories')

    return categories
}

async function getSubCategories() {

    const subCategories: SubCategories[] = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + '/sub-categories')

    return subCategories
}
async function getTags(subCategoryId: string) {

    const tags: Tag[] = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + `/tag-values/${subCategoryId}`)

    return tags
}

async function getAllPromotions() {

    const promotions: Promotion[] = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + '/promotions')

    return promotions
}
async function getFeaturedPromotion() {

    const promotion: PromotionWithItems = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + '/promotions/featured')
    
    return promotion
}

async function getPromotionById(id: string) {
    
        const { itemsOrder, subCategoryId }: { itemsOrder: string, subCategoryId: string } = helpers.getCookieValue(`promotion${id}`) || { itemsOrder: 'created_at-DESC', subCategoryId: 'all' }
        const page = helpers.getCookieIsNumber('page')

        const promotion: PromotionWithItems = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + `/promotions/${id}?order=${itemsOrder}&page=${page}&subCategoryId=${subCategoryId}`)

        return promotion
}

async function getNewestsItems() {

    const items: Item[] = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + '/items/newests')
    
    return items
}

async function getFeaturedItems() {

    const items: Item[] = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + '/items/featured')
    
    return items

}

async function getSearchItems(name: string) {

    const items: Item[] = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + `/items/search?name=${name}`)
    
    return items
}

async function getItensBySubCategory(subCategoryId: string, perPage: number = 10) {
    try {
        const page = helpers.getCookieIsNumber('page')

        const { itemsOrder, tags }: { itemsOrder: string, tags: string[] } = helpers.getCookieValue(`catalog${subCategoryId}`) || { itemsOrder: 'created_at-DESC', tags: [] }


        if (tags.length > 0) {
            const res = await fetch(process.env.API_HOST + `/tag-values/${subCategoryId}?order=${itemsOrder}&page=${page}&perPage=${perPage}`, {
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

        } else if (!(parseInt(subCategoryId) > 0)) {

            const items = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + `/items/search?name=${subCategoryId}&order=${itemsOrder}&page=${page}&perPage=${perPage}`)

            return items

        } else {

            const items = await helpers.getSimpleRequestAndHandleError(process.env.API_HOST + `/sub-categories/${subCategoryId}?order=${itemsOrder}&page=${page}&perPage=${perPage}`)

            return items
        }
    } catch (error) {
        return false
    }

}



export const catalogService = {
    getCatalog,
    getSubCategories,
    getAllPromotions,
    getFeaturedPromotion,
    getPromotionById,
    getNewestsItems,
    getFeaturedItems,
    getItensBySubCategory,
    getSearchItems,
    getTags,
}