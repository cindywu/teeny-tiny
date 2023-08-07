import { NextResponse, NextRequest } from 'next/server'
import { getUserByUsername } from '@/app/lib/db'
import { isMatchingPassword } from '@/app/lib/passwordUtils'
import { setSessionUser } from '@/app/lib/session'

export async function POST(request: NextRequest) {
  const contentType = await request.headers.get("content-type")
  if (contentType !== "text/plain;charset=UTF-8") {
    return NextResponse.json({"error": "Invalid request"}, {status: 415})
  }
  const data = await request.json()
  const {username, password, passwordConfirm} = data

  const isValidData = (username && password)
  if (!isValidData) {
    return NextResponse.json({"message": `username and password are required`}, {status: 400})
  }

  const dbResponse = await getUserByUsername(username)
  const userRecord = dbResponse[0]
  const userRecordId = userRecord.id
  const storedUserHash = userRecord.password
  const isValidPasswordRequest = await isMatchingPassword(password, storedUserHash)
  if (!isValidPasswordRequest) {
    return NextResponse.json({"message": `Invalid creds, please try again.`}, {status: 400})
  }
  await setSessionUser(userRecordId)
  return NextResponse.json({}, {status: 200})
}