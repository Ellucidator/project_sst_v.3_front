import { NextResponse, NextRequest } from 'next/server'
import { cookieService } from './services/cookieService'

export async function middleware(request: NextRequest) {
    
    const verifyLogin = await cookieService.verifySession()
    if(!verifyLogin) return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: '/user/:path*'
}