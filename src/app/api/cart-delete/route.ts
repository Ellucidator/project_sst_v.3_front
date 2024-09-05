import { helpers } from "@/helpers/helpers";
import { Cart } from "@/types/itemsTypes";
import {cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {


    const cookieCart:Cart = helpers.getCookieValue('car')
    console.log(cookieCart)
    if(cookieCart.purchase_id)cookies().delete('car')

    const loginUrl = new URL('/user/home', request.url)
    

    return NextResponse.redirect(loginUrl)
}

