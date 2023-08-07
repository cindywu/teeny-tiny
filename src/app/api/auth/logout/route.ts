import { NextResponse, NextRequest } from 'next/server'
import { endSessionForUser } from '@/app/lib/session'

export async function POST(request: NextRequest) {
  await endSessionForUser()
  return NextResponse.json({}, {status: 200})
}