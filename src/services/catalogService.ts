import { Categories } from "@/types/catalogTypes";


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
    
}


export const catalogService = {
    getCatalog
}