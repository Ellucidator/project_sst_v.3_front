import {cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    
    cookies().delete('token')

    const newUrl = new URL(`/form/login`,request.url)

    return NextResponse.redirect(newUrl)

}

