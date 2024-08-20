import { cookies } from "next/headers";

function getCookieValue(cookieName: string) {
    const cookie = cookies().get(cookieName)?.value
    
    if(!cookie) return false
    
    return JSON.parse(cookie)
}

function getCookieIsNumber(cookieName: string): number {
    const cookie = cookies().get(cookieName)?.value

    if(cookie && typeof parseInt(cookie) === 'number')return parseInt(cookie)

    return 1
}

async function getSimpleRequestAndHandleError(
    url:string, 
    cache:RequestCache = 'default', 
    revalidate:number|false = false, 
    tags:string[]|undefined = undefined
){

    try {
        const res = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache,
            next: {
                revalidate,
                tags
            }
        })

        if(!res.ok) return false

        return await res.json()
    } catch (error) {
        return false
    }

}

export const helpers = {
    getCookieValue,
    getCookieIsNumber,
    getSimpleRequestAndHandleError
}