import {cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Params={
    urlRoute:string
}
export async function GET(request: NextRequest,context:{params:Params}) {

    cookies().delete(`modalUser`)
    cookies().delete(`modal`)
    
    const newUrl = new URL(`/user/${context.params.urlRoute}`,request.url)

    return NextResponse.redirect(newUrl)

}

