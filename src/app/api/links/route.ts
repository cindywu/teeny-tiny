import { NextResponse, NextRequest } from 'next/server'
import isValidURL from '@/app/lib/isValidURL'

export async function POST(request: NextRequest) {
  // using standard HTML form
  // const formData = await request.formData()
  // console.log(formData)
  const contentType = await request.headers.get("content-type")
  console.log({contentType})
  if (contentType !== "text/plain;charset=UTF-8") {
    return NextResponse.json({"error": "Invalid request"}, {status: 400})
  }
  const data = await request.json()
  const url = data && data.url ? data.url : null
  const validURL = await isValidURL(url, ["teeny-tiny.vercel.app", process.env.NEXT_PUBLIC_VERCEL_URL as string])
  console.log({validURL})
  if (!validURL) {
    return NextResponse.json({"message": `${url} is not valid.`}, {status: 400})
  }
  return NextResponse.json(data, {status: 201})
}