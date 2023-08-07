import { NextResponse, NextRequest } from 'next/server'
import isValidURL from '@/app/lib/isValidURL'
import { addLink } from '@/app/lib/db'
import { getMinLinksAndVisits } from '@/app/lib/db'

export async function GET(request: NextRequest) {
  const links = await getMinLinksAndVisits(100, 0)
  return NextResponse.json(links, {status: 200})
}

export async function POST(request: NextRequest) {
  const contentType = await request.headers.get("content-type")
  if (contentType !== "text/plain;charset=UTF-8") {
    return NextResponse.json({"error": "Invalid request"}, {status: 400})
  }
  const data = await request.json()
  const url = data && data.url ? data.url : null
  const validURL = await isValidURL(url, ["teeny-tiny.vercel.app", process.env.NEXT_PUBLIC_VERCEL_URL as string])
  if (!validURL) {
    return NextResponse.json({"message": `${url} is not valid.`}, {status: 400})
  }
  const dbResponse = await addLink(url)
  const responseData = dbResponse.data && dbResponse.data? dbResponse.data : {}
  const responseStatus = dbResponse.status && dbResponse.status? dbResponse.status : 500
  return NextResponse.json(responseData, {status: responseStatus})
}