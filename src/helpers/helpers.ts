import { cookies } from "next/headers";

function getCookieValue(cookieName: string) {
    const cookie = cookies().get(cookieName)?.value
    
    if(!cookie) return false
    
    return JSON.parse(cookie)
}
export const helpers = {
    getCookieValue,
}