import { cookies } from "next/headers"
import * as jose from 'jose'
import { UserPayload } from "@/types/userTypes"
import { revalidateTag } from "next/cache"


const verifyRegister = async () => {

    const cookieValue = cookies().get('register')?.value
    const req = await fetch('http://localhost:3000/verify-register', {
        cache: 'no-store',
        next: {
            tags: ['verify-register']
        },

    })
    if (cookieValue) {
        return await JSON.parse(cookieValue)
    } else {
        return {
            email: false,
            password: false
        }
    }
}
const verifyLogin = async () => {
    const cookieValue = cookies().get('login')?.value

    if (cookieValue) {
        return await JSON.parse(cookieValue)
    } else {
        return {
            error: null
        }
    }
}
const verifySession = async () => {

    const cookieValue = cookies().get('token')?.value
    if (cookieValue) {

        try {

            const verifyServer = await fetch('http://localhost:3000/verify-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: cookieValue }),
                cache: 'no-store',
                next: {
                    tags: ['verify-login']
                }
            })

            const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
            const { payload }: { payload: UserPayload } = await jose.jwtVerify(cookieValue, secret)

            if (typeof payload === 'string' || typeof payload === 'undefined' || !verifyServer.ok) return false

            return payload

        } catch (error) {
            return false
        }

    } else {
        return false
    }

}

const setSession = async (email: string, password: string) => {
    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            cache: 'no-store'
        })
        const data = await res.json();


        if (data.token) {
            cookies().set('token', data.token, {
                maxAge: 60 * 60 * 24,
            })
            return true
        }

        revalidateTag('user-info')
        return data

    } catch (error) {
        return false
    }
}

export const authService = {
    verifySession,
    setSession,
    verifyRegister,
    verifyLogin,
}