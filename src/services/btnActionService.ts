import { cookies } from "next/headers"
import { redirect } from "next/navigation"

async function setCookiePage(page: string) {
    'use server'
    cookies().set('page', page, {
        maxAge: 0
    })
}

async function setCookieModal(modal: string) {
    'use server'
    cookies().set('modal', modal, {
        maxAge: 0
    })
}

async function btnSubCategoryAction(url:string){
    'use server'
    const [categoryName, subCategoryId] = url.split('/')

    cookies().delete(`catalog${subCategoryId}`)
    cookies().delete(`modal`)

    redirect(`/catalog/${url}`)
}

export const btnActionService = {

    btnSubCategoryAction,
    setCookiePage,
    setCookieModal
}