import { NextResponse, NextRequest } from 'next/server'
import { registerUser } from '@/app/lib/db'

export async function POST(request: NextRequest) {
  const contentType = await request.headers.get("content-type")
  console.log({contentType}, "hi")
  if (contentType !== "text/plain;charset=UTF-8") {
    return NextResponse.json({"error": "Invalid request"}, {status: 415})
  }
  const data = await request.json()
  const {username, password, passwordConfirm} = data
  if (password !== passwordConfirm) {
    return NextResponse.json({"message": `passwords must match. please try again.`}, {status: 400})
  }

  const isValidData = (username && password)
  if (!isValidData) {
    return NextResponse.json({"message": `username and password are required`}, {status: 400})
  }
  const toSaveData : { username: string; password: string; email?: string; } = {
    username: data.username,
    password: data.password,
  }
  if (data.email) {
    toSaveData["email"] = data.email
  }

  const dbResponse = await registerUser(toSaveData)
  const responseData = dbResponse.data && dbResponse.data? dbResponse.data : {}
  const responseStatus = dbResponse.status && dbResponse.status? dbResponse.status : 500
  return NextResponse.json(responseData, {status: responseStatus})
}