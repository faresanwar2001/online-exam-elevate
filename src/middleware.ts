import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const authPages = ['/components/auth/login','/components/auth/register']
const publicPages=['/dashboard']

export default async function middleware(request:NextRequest){
const token = await getToken({req: request})


const url = request.nextUrl.pathname

    if(token && authPages.includes(url) ){
        const redirectUrl = new URL ('/dashboard',request.nextUrl.origin)
        return NextResponse.rewrite(redirectUrl)
    }
    if(!token && publicPages.includes(url) ){
        const redirectUrl = new URL ('/components/auth/login',request.nextUrl.origin)
        return NextResponse.rewrite(redirectUrl)
    }

    return NextResponse.next()
}

export const config = {
    match:['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}