import { helpers } from "@/helpers/helpers";
import { Categories, SubCategories } from "@/types/catalogTypes";
import { Item } from "@/types/itemsTypes";
import { Promotion, PromotionWithItems } from "@/types/promotionsTypes";
import { Tag } from "@/types/tagTypes";

async function getCatalog() {
    try {
        const res = await fetch(process.env.API_HOST + '/categories', {
            next: {
                revalidate: 10
            },
            cache: 'force-cache',

        });
        const data: Categories[] = await res.json();
        return data;

    } catch (error) {
        return []
    }
}

async function getSubCategories() {
    try {
        const res = await fetch(process.env.API_HOST + `/sub-categories`, {
            next: {
                revalidate: 10
            },
            cache: 'no-cache',
        })

        const data: SubCategories[] = await res.json();
        return data

    } catch (error) {
        return []
    }
}
async function getTags(subCategoryId: string) {
    try {
        const res = await fetch(process.env.API_HOST + `/tags/${subCategoryId}`, {
            next: {
                revalidate: 10
            },
            cache: 'no-cache'
        })

        const data: Tag[] = await res.json();
        if(typeof data === 'object') return []

        return data;

    } catch (error) {
        return 
    }
}

async function getAllPromotions() {
    try {
        const res = await fetch(process.env.API_HOST + '/promotions', {
            next: {
                revalidate: 10
            },
            cache: 'default',
        })
        const data: Promotion[] = await res.json();
        return data;

    } catch (error) {
        return []
    }
}
async function getFeaturedPromotion() {
    try {
        const res = await fetch(process.env.API_HOST + '/promotions/featured', {
            next: {
                revalidate: 10
            },
            cache: 'force-cache'
        })
        const data: PromotionWithItems = await res.json();
        return data;

    } catch (error) {
        return false
    }
}

async function getPromotionById(id: string) {
    try {
        const { itemsOrder, subCategoryId }: { itemsOrder: string, subCategoryId: string } = helpers.getCookieValue(`promotion${id}`) || { itemsOrder: 'created_at-DESC', subCategoryId: 'all' }

        const page = helpers.getCookieIsNumber('page')

        const res = await fetch(process.env.API_HOST + `/promotions/${id}?page=${page}&perPage=12&order=${itemsOrder}${subCategoryId === 'all' ? '' : `&subCategoryId=${subCategoryId}`}`, {
            method: 'GET',
            next: {
                revalidate: 10
            },
            cache: 'force-cache'
        })
        const data: PromotionWithItems = await res.json();
        return data;

    } catch (error) {
        return false
    }
}

async function getNewestsItems() {
    try {
        const res = await fetch(process.env.API_HOST + `/items/newests`, {
            next: {
                revalidate: 10
            },
            cache: 'default'
        })
        const data: Item[] = await res.json();
        return data;

    } catch (error) {
        return []
    }
}

async function getFeaturedItems() {
    try {
        const res = await fetch(process.env.API_HOST + `/items/highlighted`, {
            next: {
                revalidate: 10
            },
            cache: 'no-cache'
        })
        const data: Item[] = await res.json();
        return data;

    } catch (error) {
        return []
    }
}

async function getSearchItems(name: string) {
    try {
        const res = await fetch(process.env.API_HOST + `/items/search?name=${name}`, {
            cache: 'no-store'
        })
        const data: Item[] = await res.json();
        return data

    } catch (error) {
        return []
    }
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

            const res = await fetch(process.env.API_HOST + `/items/search?name=${subCategoryId}&order=${itemsOrder}&page=${page}&perPage=${perPage}`, {
                next: {
                    revalidate: 10
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache',
                method: 'GET',
            })
            const data: SubCategories = await res.json();
            return data

        } else {
            const res = await fetch(process.env.API_HOST + `/sub-categories/${subCategoryId}?order=${itemsOrder}&page=${page}&perPage=${perPage}`, {
                next: {
                    revalidate: 10
                },
                cache: 'no-cache'
            })
            const data: SubCategories = await res.json();
            return data;
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