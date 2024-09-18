import { helpers } from "@/helpers/helpers";
import { Categories, SubCategories } from "@/types/catalogTypes";
import { Item } from "@/types/itemsTypes";
import { Promotion, PromotionWithItems } from "@/types/promotionsTypes";
import { Tag } from "@/types/tagTypes";

async function getCatalog() {
    const categories: Categories[]|false = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + '/categories',
        cache: 'default',
        revalidate: 60*60*24
    })

    return categories
}

async function getSubCategories() {

    const subCategories: SubCategories[]|false = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + '/sub-categories',
        cache: 'default',
        revalidate: 60*60*24
    })

    return subCategories
}
async function getTags(subCategoryId: string) {
    const tags: Tag[]|false = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + `/tags/${subCategoryId}`,
        cache: 'default',
        revalidate: 60*60*24
    })
    
    return tags
}

async function getAllPromotions() {

    const promotions: Promotion[]|false = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + '/promotions',
        cache: 'default',
        revalidate: 60*60*24
    })

    return promotions
}
async function getFeaturedPromotion() {

    const promotion: PromotionWithItems|false = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + '/promotions/featured',
        cache: 'default',
        revalidate: 60*60*12
    })
    
    return promotion
}

async function getPromotionById(id: string) {
    
        const { itemsOrder, subCategoryId }: { itemsOrder: string, subCategoryId: string } = helpers.getCookieValue(`promotion${id}`) || { itemsOrder: 'createdAt-DESC', subCategoryId: 'all' }
        const page = helpers.getCookieIsNumber('page')

        const promotion: PromotionWithItems|false = await helpers.getSimpleRequestAndHandleError({
            url: process.env.API_HOST + `/promotions/${id}?page=${page}&perPage=10&order=${itemsOrder}&subCategoryId=${subCategoryId}`,
            cache: 'default',
            revalidate: 60*60*12
        })

        return promotion
}

async function getNewestsItems() {

    const items: Item[]|false = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + '/items/newests',
        cache: 'default',
        revalidate: 60*60*24
    })
    
    return items
}

async function getFeaturedItems() {

    const items: Item[]|false = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + '/items/highlighted',
        cache: 'default',
        revalidate: 60*60*24
    })
    
    return items

}

async function getSearchItems(name: string) {

    const items: Item[]|false = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + `/items/search?name=${name}`,
        cache: 'default',
        revalidate: 60*60*24
    })
    
    return items
}

async function getItensBySubCategory(subCategoryId: string, perPage: number = 10) {
    try {
        const page = helpers.getCookieIsNumber('page')

        const { itemsOrder, tags }: { itemsOrder: string, tags: string[] } = helpers.getCookieValue(`catalog${subCategoryId}`) || { itemsOrder: 'createdAt-DESC', tags: [] }


        if (tags.length > 0) {

            const data: SubCategories|false = await helpers.getSimpleRequestAndHandleError({
                url:process.env.API_HOST + `/tag-values/${subCategoryId}?order=${itemsOrder}&page=${page}&perPage=${perPage}`,
                cache: 'default',
                revalidate: 0,
                method: 'POST',
                body: JSON.stringify({ tags })
            })
            return data;

        } else if (!(parseInt(subCategoryId) > 0)) {

            const data:SubCategories|false = await helpers.getSimpleRequestAndHandleError({
                url: process.env.API_HOST + `/items/search?name=${subCategoryId}&order=${itemsOrder}&page=${page}&perPage=${perPage}`,
                cache: 'default',
                revalidate: 60*60*24
            })

            return data

        } else {

            const data: SubCategories|false = await helpers.getSimpleRequestAndHandleError({
                url: process.env.API_HOST + `/sub-categories/${subCategoryId}?order=${itemsOrder}&page=${page}&perPage=${perPage}`,
                cache: 'default',
                revalidate: 60*60*24
            })

            return data
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