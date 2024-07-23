import {cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url)
    const token = cookies().get('token')?.value
    if (!token) return

    const address = searchParams.get('address_id')

    const cookieCart = cookies().get('car')?.value
    
    
    fetch(`http://localhost:3000/user/purchase/${address}?payment_type=${searchParams.get('payment_type')}`,{
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

