
import { CreateUser, Favorites, UserAddress, UserInfo } from "@/types/userTypes";
import { authService } from "./authService";
import { Avaliation, CreateAvaliation } from "@/types/avaliationTypes";
import { Purchase, Purchases } from "@/types/purchaseTypes";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { helpers } from "@/helpers/helpers";
import { redirect } from "next/navigation";


const createUser = async (user: CreateUser) => {

    try {
        const res = await fetch(process.env.API_HOST + '/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        if (!res.ok) return false

        await authService.setSession(user.email, user.password)

        return true
    } catch (error) {
        return false
    }
}

const showUser = async () => {
    const token = cookies().get('token')?.value
    if (!token) return

    const data: UserInfo = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + '/user',
        cache: 'default',
        revalidate: false,
        tags: ['user-info'],
        authorization: token
    })

    return data
}

const updatedUser = async (updateAtributes: Omit<UserInfo, 'imgUrl' | 'id'>) => {
    const token = cookies().get('token')?.value
    if (!token) return

    const res = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + '/user',
        authorization: token,
        method: 'PUT',
        body: JSON.stringify(updateAtributes)
    })

    revalidateTag('user-info')

}

const createAvaliation = async (avaliation: CreateAvaliation) => {
    const token = cookies().get('token')?.value
    if (!token) {
        cookies().set('redirect', `/item/${avaliation.item_id}`)
        redirect('/form/login')
    }
    const data = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + '/item/create-avaliation',
        method: 'POST',
        authorization: token,
        body: JSON.stringify(avaliation),
    });

    revalidateTag('avaliation-user')

    return data
}

const getAvaliationByUserId = async (itemId: string|number) => {
    const user = await authService.verifySession()
    if (!user) return false
    
    const data: Avaliation = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + `/user/${user.id}-${itemId}/avaliation`,
        cache: 'default',
        tags: ['avaliation-user'],
        revalidate: false
    })

    return data
}

async function getUserAddessById(id: string) {
    const token = cookies().get('token')?.value
    if (!token) return
    
    const data: UserAddress = await helpers.getSimpleRequestAndHandleError({
        url:process.env.API_HOST + `/user/address/${id}`,
        cache: 'default',
        revalidate: false,
        authorization: token,
        tags: ['one-address-user'],
    })
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

    const data: UserAddress[] = await helpers.getSimpleRequestAndHandleError({
        url:process.env.API_HOST + `/user/addresses`,
        authorization:token,
        cache: 'default',
        revalidate: false,
        tags: ['adresses-user'],
    })

    return data
}

async function createAddress(address: UserAddress) {

    const token = cookies().get('token')?.value
    if (!token) return false

    await fetch(process.env.API_HOST + `/user/address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(address)
    })

    revalidateTag('adresses-user')
}

async function deleteUserAddress(id: string) {
    'use server'
    const token = cookies().get('token')?.value
    if (!token) return

    await fetch(process.env.API_HOST + `/user/address/${id}`, {
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

    await fetch(process.env.API_HOST + `/user/address/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    revalidateTag('adresses-user')
    revalidateTag('one-address-user')
}

async function createPurchase(cookieCart:BodyInit) {
    const token = cookies().get('token')?.value
    if (!token) return


    const data: { preference_id: string,purchase_id: string } = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + `/user/purchase`,
        authorization: token,
        method: 'POST',
        body: cookieCart,
    })

    revalidateTag('purchases-user')
    return data
}

async function getUserPurchases(perPage: number = 6) {
    'use server'
    const page = helpers.getCookieIsNumber('page')

    const token = cookies().get('token')?.value
    if (!token) return false

    const data: Purchases = await helpers.getSimpleRequestAndHandleError({
        url:process.env.API_HOST + `/user/show/purchases?page=${page}&perPage=${perPage}`,
        authorization: token,
        cache: 'default',
        revalidate: 60*60*24,
        tags: ['purchases-user'],
    })

    return data
}

async function getUserPurchaseById(purchaseId: string) {

    const token = cookies().get('token')?.value
    if (!token) return false

    const data: Purchase = await await helpers.getSimpleRequestAndHandleError({
        url:process.env.API_HOST + `/user/show/purchase/${purchaseId}`,
        authorization: token,
        cache: 'default',
        revalidate: 60*60*2,
        tags: ['one-purchase-user'],
    })

    return data
}

async function addUserFavorites(itemId: string) {
    'use server'
    const token = cookies().get('token')?.value
    if (!token) {
        cookies().set('redirect', `/item/${itemId}`)
        redirect('/form/login')
    }

    await fetch(process.env.API_HOST + `/user/favorite`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ itemId: parseInt(itemId) })
    })
    revalidateTag('favorites-user')
    revalidateTag('one-favorite-user')
}

async function getUserFavorites(perPage: number = 10) {
    const page = helpers.getCookieIsNumber('page')

    const token = cookies().get('token')?.value
    if (!token) return false

    const data: Favorites = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + `/user/show/favorites?page=${page}&perPage=${perPage}`,
        authorization: token,
        cache: 'default',
        revalidate: false,
        tags: ['favorites-user'],
    })

    return data
}

async function getUserFavoriteByItemId(itemId: string) {
    const token = cookies().get('token')?.value
    if (!token) return false

    const data = await helpers.getSimpleRequestAndHandleError({
        url: process.env.API_HOST + `/user/show/favorite/${itemId}`,
        authorization: token,
        cache: 'default',
        revalidate: false,
        tags: ['one-favorite-user'],
    })
    if (!data) return false

    return true
}
async function deleteUserFavorites(id: string) {
    'use server'
    const token = cookies().get('token')?.value
    if (!token) return false

    await fetch(process.env.API_HOST + `/user/favorite/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    revalidateTag('favorites-user')
    revalidateTag('one-favorite-user')
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
    createPurchase,
    getUserPurchases,
    getUserPurchaseById,
    addUserFavorites,
    getUserFavorites,
    getUserFavoriteByItemId,
    deleteUserFavorites
}