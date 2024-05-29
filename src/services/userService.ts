
import { CreateUser, Favorites, UserAddress, UserFavorite, UserInfo } from "@/types/userTypes";
import { cookieService } from "./cookieService";
import { Avaliation, CreateAvaliation } from "@/types/avaliationTypes";
import { Purchase, Purchases } from "@/types/purchaseTypes";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";


const createUser = async (user: CreateUser) => {

    try {
        const res = await fetch('http://localhost:3000/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            cache: 'no-store'
        })

        if (!res.ok) return false

        await cookieService.setSession(user.email, user.password)

        return true
    } catch (error) {
        return false
    }
}

const showUser = async () => {
    const token = cookies().get('token')?.value
    if (!token) return


    const res = await fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        cache: 'default',
        next: {
            tags: ['user-info'],
        },
    })
    const data:UserInfo = await res.json();

    return data
}

const updatedUser = async (updateAtributes: Omit<UserInfo,'imgUrl'|'id'>) => {
    const token = cookies().get('token')?.value
    if (!token) return

    const res = await fetch('http://localhost:3000/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(updateAtributes),
    })
    
    revalidateTag('user-info')

}

const createAvaliation = async (avaliation: CreateAvaliation) => {
    try {
        const res = await fetch('http://localhost:3000/item/create-avaliation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avaliation),
            cache: 'no-store'
        })

        const data = await res.json();

        return data
    } catch (error) {
        return false
    }
}

const getAvaliationByUserId = async () => {
    const user = await cookieService.verifySession()
    if (!user) return false

    try {
        const avaliation = await fetch(`http://localhost:3000/user/${user.id}/avaliation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            next: {
                revalidate: 10,
                tags: ['avaliation-user'],
            },
        })

        const data: Avaliation = await avaliation.json();
        return data

    } catch (error) {
        if (error) return false
    }

}

async function getUserAddessById(id: string) {
    const token = cookies().get('token')?.value
    if (!token) return

    const address = await fetch(`http://localhost:3000/user/address/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })

    const data: UserAddress = await address.json();
    if (!data) return {
        receiver_name: '',
        zip_code: 0,
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        house_number: '',
        complement: '',
        phone_number: '',
        reference_point: '',
        active: false
    }

    return data

}
async function getUserAdresses() {

    const token = cookies().get('token')?.value
    if (!token) return false

    const adresses = await fetch(`http://localhost:3000/user/addresses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },

        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['adresses-user'],
        },
    })

    const data: UserAddress[] = await adresses.json();
    return data
}

async function createAddress(address: UserAddress) {

    const token = cookies().get('token')?.value
    if (!token) return false

    await fetch(`http://localhost:3000/user/address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(address)
    })

}

async function deleteUserAddress(id: string) {
    'use server'
    const token = cookies().get('token')?.value
    if (!token) return

    await fetch(`http://localhost:3000/user/address/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    revalidateTag('adresses-user')
}
async function activeUserAddress(id: string) {
    'use server'
    const token = cookies().get('token')?.value
    if (!token) return

    await fetch(`http://localhost:3000/user/address/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    revalidateTag('adresses-user')
}
async function getUserPurchases(page: number = 1, perPage: number = 6) {
    'use server'
    const pageCookie = cookies().get('page')?.value
    if (pageCookie) page = parseInt(pageCookie)

    const token = cookies().get('token')?.value
    if (!token) return false

    const purchases = await fetch(`http://localhost:3000/user/show/purchases?page=${page}&perPage=${perPage}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },

        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['purchases-user'],
        },
    })

    const data: Purchases = await purchases.json();
    return data
}

async function getUserPurchaseById(purchaseId: string) {

    const token = cookies().get('token')?.value
    if (!token) return false

    const purchases = await fetch(`http://localhost:3000/user/show/purchase/${purchaseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },

        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['one-purchase-user'],
        },
    })

    const data: Purchase = await purchases.json();
    return data
}

async function getUserFavorites(page: number = 1, perPage: number = 10) {
    const pageCookie = cookies().get('page')?.value
    if (pageCookie) page = parseInt(pageCookie)

    const token = cookies().get('token')?.value
    if (!token) return false

    const favorites = await fetch(`http://localhost:3000/user/show/favorites?page=${page}&perPage=${perPage}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },

        cache: 'no-store',
        next: {
            revalidate: 10,
            tags: ['favorites-user'],
        },
    })

    const data: Favorites = await favorites.json();
    return data
}
async function deleteUserFavorites(id: string) {
    'use server'
    const token = cookies().get('token')?.value
    if (!token) return false

    await fetch(`http://localhost:3000/user/favorite/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    revalidateTag('favorites-user')
}



export const userService = {
    createUser,
    showUser,
    updatedUser,
    createAvaliation,
    getAvaliationByUserId,
    getUserAddessById,
    getUserAdresses,
    createAddress,
    deleteUserAddress,
    activeUserAddress,
    getUserPurchases,
    getUserPurchaseById,
    getUserFavorites,
    deleteUserFavorites
}