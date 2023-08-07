import { NextResponse,  NextRequest } from 'next/server'

export async function GET(request: NextRequest, context: any)  {
  const { params } = context
  const { slug } = params
  return NextResponse.json({slug})
}

export async function POST() {
  return NextResponse.json({hello: 'abc'})
}