import { NextRequest, NextResponse } from "next/server";

type Params={
    urlRoute:string
}
export async function GET(request: NextRequest,context:{params:Params}) {
    
    const newUrl = new URL(`/user/${context.params.urlRoute}`,request.url)
    console.log(newUrl)
    // return NextResponse.redirect(newUrl)
}

