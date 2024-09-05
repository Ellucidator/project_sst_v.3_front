import { NextResponse, NextRequest } from 'next/server'
import { authService } from './services/authService'

export async function middleware(request: NextRequest) {

    const verifyLogin = await authService.verifySession()
    if(!verifyLogin) return NextResponse.redirect(new URL('/', request.url))
    
}

export const config = {
    matcher: '/user/:path*'
}