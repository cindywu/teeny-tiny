import { NextRequest, NextResponse } from 'next/server'
import { saveLinkVisit } from '@/app/lib/db'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const {linkId} = data
    const result = await saveLinkVisit(linkId)
    console.log("save visit result", result)
    return NextResponse.json({}, {status: 201})
}