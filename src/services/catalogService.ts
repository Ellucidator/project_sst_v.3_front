import { Categories } from "@/types/catalogTypes";
import { PromotionWithItems } from "@/types/promotionsTypes";


async function getCatalog() {
    const res = await fetch('http://localhost:3000/categories', {
        next:{
            revalidate: 60*60*60*24
        },
        cache: 'force-cache'
    });
    const data: Categories[] = await res.json();
    return data;
}

async function getFeaturedPromotion(){
    const res = await fetch('http://localhost:3000/promotions/featured', {
        next:{
            revalidate: 60*60*60*24
        },
        cache: 'force-cache'
    })
    const data: PromotionWithItems = await res.json();
    return data;
}


export const catalogService = {
    getCatalog,
    getFeaturedPromotion
}