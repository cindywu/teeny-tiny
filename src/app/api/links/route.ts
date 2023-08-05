import { NextResponse, NextRequest } from 'next/server'

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
  return NextResponse.json(data, {status: 201})
}