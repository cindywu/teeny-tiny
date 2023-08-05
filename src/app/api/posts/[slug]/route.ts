import { NextResponse,  NextRequest } from 'next/server'

export async function GET(request: NextRequest, context: any)  {
    // console.log({request}, {context})
    const { params } = context
    const { slug } = params
    console.log({slug})
    return NextResponse.json({slug})
}

export async function POST() {
    return NextResponse.json({hello: 'abc'})
}