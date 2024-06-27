import { Categories, SubCategories } from "@/types/catalogTypes";
import { Item } from "@/types/itemsTypes";
import { PromotionWithItems } from "@/types/promotionsTypes";
import { Tag } from "@/types/tagTypes";
import { cookies } from "next/headers";


async function getCatalog() {
    const res = await fetch('http://localhost:3000/categories', {
        next:{
            revalidate: 10
        },
        cache: 'force-cache',

    });
    const data: Categories[] = await res.json();
    return data;
}
async function getTags(subCategoryId:string) {
    const res = await fetch(`http://localhost:3000/tags/${subCategoryId}`, {
        next:{
            revalidate: 10
        },
        cache: 'no-cache'
    })
    if(res.status !== 200) return []

    const data: Tag[] = await res.json();
    return data;
}
async function getFeaturedPromotion(){
    const res = await fetch('http://localhost:3000/promotions/featured', {
        next:{
            revalidate: 10
        },
        cache: 'force-cache'
    })
    const data: PromotionWithItems = await res.json();
    return data;
}

async function getNewestsItems(){
    const res = await fetch(`http://localhost:3000/items/newests`, {
        next:{
            revalidate: 10
        },
        cache: 'default'
    })
    const data: Item[] = await res.json();
    return data;
}

async function getFeaturedItems(){
    const res = await fetch(`http://localhost:3000/items/highlighted`, {
        next:{
            revalidate: 10
        },
        cache: 'no-cache'
    })
    const data: Item[] = await res.json();
    return data;
}

async function getSearchItems(name:string){
    const res = await fetch(`http://localhost:3000/items/search?name=${name}`,{
        cache: 'no-store'
    })
    const data: Item[] = await res.json();
    return data
}

async function getItensBySubCategory(subCategoryId: string) {


    let page = cookies().get('page')?.value
    if (!page) page = '1'

    let itemsOrder: string = 'created_at-DESC'
    let tags: string[] = []

    const catalogCookie = cookies().get(`catalog${subCategoryId}`)?.value
    
    if (catalogCookie) {
        const catalogCookieOn: { itemsOrder?: string, tags?: string[] } = JSON.parse(catalogCookie)

        if (catalogCookieOn.itemsOrder) itemsOrder = catalogCookieOn.itemsOrder
        if (catalogCookieOn.tags) tags = catalogCookieOn.tags
    }


    if (tags.length > 0) {
        const res = await fetch(`http://localhost:3000/tag-values/${subCategoryId}?order=${itemsOrder}&page=${page}`, {
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
    } else if(!(parseInt(subCategoryId) > 0)){

        const res = await fetch(`http://localhost:3000/items/search?name=${subCategoryId}&order=${itemsOrder}&page=${page}`,{
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
        const res = await fetch(`http://localhost:3000/sub-categories/${subCategoryId}?order=${itemsOrder}&page=${page}`, {
            next: {
                revalidate: 10
            },
            cache: 'no-cache'
        })
        const data: SubCategories = await res.json();
        return data;
    }

}

async function getItensByTags(subCategoryId: string|number ,itemsOrder:string = 'created_at-DESC',page:number = 1,tags:string[]) {

    const res = await fetch(`http://localhost:3000/tag-values/${subCategoryId}?order=${itemsOrder}&page=${page}`, {
        next:{
            revalidate: 10
        },
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({tags})
    })
    const data: SubCategories = await res.json();

    return data;
}



export const catalogService = {
    getCatalog,
    getFeaturedPromotion,
    getNewestsItems,
    getFeaturedItems,
    getItensBySubCategory,
    getSearchItems,
    getTags,
    getItensByTags,
}