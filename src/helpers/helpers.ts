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

interface SimpleRequest{
    url:string, 
    cache?:RequestCache 
    revalidate?:number|false 
    tags?:string[]
    method?:'GET'|'POST'|'PUT'|'DELETE',
    authorization?:string,
    body?:BodyInit

}
async function getSimpleRequestAndHandleError({url, cache, revalidate, tags, method='GET', authorization='', body}:SimpleRequest) {

    try {
        const res = await fetch(url,{
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            cache,
            next: {
                revalidate,
                tags
            },
            body
        })
        console.log(res.url, res.status)
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