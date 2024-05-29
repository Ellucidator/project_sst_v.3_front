import { Avaliation, AvaliationAndCount } from "@/types/avaliationTypes";
import { cookies } from "next/headers";

async function getAllAvaliationsByItemId(itemId:string) {
    let page = 1
    const pageCookie = cookies().get('page')?.value
    if (pageCookie) page = parseInt(pageCookie)


    const res = await fetch(`http://localhost:3000/item/${itemId}/avaliations?page=${page}`, {
        next:{
            revalidate: 10,
            tags: ['all-avaliations-item']
        },
        cache: 'no-cache'
    })
    const data: AvaliationAndCount = await res.json();
    return data;
}


const catalogServerService = {
    getAllAvaliationsByItemId
}

export default catalogServerService