import {cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Params={
    urlRoute:string
}
export async function GET(request: NextRequest,context:{params:Params}) {


    const [category, subCategoryId] = context.params.urlRoute.split('-')

    cookies().delete(`catalog${subCategoryId}`)
    cookies().delete(`modal`)
    
    const newUrl = new URL(`/catalog/${category}/${subCategoryId}`,request.url)

    return NextResponse.redirect(newUrl)

}

