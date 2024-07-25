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

export const helpers = {
    getCookieValue,
    getCookieIsNumber
}