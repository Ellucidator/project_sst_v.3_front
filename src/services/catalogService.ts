import { Categories, SubCategories } from "@/types/catalogTypes";
import { Item } from "@/types/itemsTypes";
import { PromotionWithItems } from "@/types/promotionsTypes";


async function getCatalog() {
    const res = await fetch('http://localhost:3000/categories', {
        next:{
            revalidate: 10
        },
        cache: 'default',

    });
    const data: Categories[] = await res.json();
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
    console.log(data)
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
    console.log(data)
    return data
}

async function getItensBySubCategory(subCategoryId: string ,itemsOrder:string){
    const res = await fetch(`http://localhost:3000/sub-categories/${subCategoryId}?order=${itemsOrder}`, {
        next:{
            revalidate: 10
        },
        cache: 'no-cache'
    })
    const data: SubCategories = await res.json();
    return data;
}

async function getItensByCategory(catogryId: string ,itemsOrder:string){
    const res = await fetch(`http://localhost:3000/categories/${catogryId}?order=${itemsOrder}`, {
        next:{
            revalidate: 10
        },
        cache: 'no-cache'
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
    getItensByCategory
}