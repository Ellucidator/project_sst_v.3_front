import {cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    
    cookies().delete('token')


    return NextResponse.redirect(`${request.nextUrl.origin}`)

}

