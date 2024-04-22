import { Categories, SubCategories } from "@/types/catalogTypes";
import { Item, ItemFull } from "@/types/itemsTypes";
import { PromotionWithItems } from "@/types/promotionsTypes";
import { Tag } from "@/types/tagTypes";


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

async function getItensBySubCategory(subCategoryId: string|number ,itemsOrder:string = 'created_at-DESC',page:number = 1) {
    const res = await fetch(`http://localhost:3000/sub-categories/${subCategoryId}?order=${itemsOrder}&page=${page}`, {
        next:{
            revalidate: 10
        },
        cache: 'no-cache'
    })
    const data: SubCategories = await res.json();
    return data;
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
    console.log(res)
    const data: SubCategories = await res.json();
    console.log(data)
    return data;
}



export const catalogService = {
    getCatalog,
    getFeaturedPromotion,
    getNewestsItems,
    getFeaturedItems,
    getItensBySubCategory,
    getSearchItems,
    getOneItem,
    getTags,
    getItensByTags
}