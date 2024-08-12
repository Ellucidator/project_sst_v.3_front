import {cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url)
    const token = cookies().get('token')?.value
    if (!token) return

    const cookieCart = cookies().get('car')?.value
    
    
    fetch(process.env.API_HOST + `/user/purchase?payment_type=${searchParams.get('payment_type')}`,{
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: cookieCart
    })
    

    
    // cookies().delete('car')

    return NextResponse.json({})
    // return NextResponse.redirect(`${request.nextUrl.origin}/user/pay`)

}

