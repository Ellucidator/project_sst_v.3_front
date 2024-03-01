import { Categories } from "@/types/catalogTypes";


async function getCatalog() {
    const res = await fetch('http://localhost:3000/categories');
    const data: Categories[] = await res.json();
    return data;
}


export const catalogService = {
    getCatalog
}