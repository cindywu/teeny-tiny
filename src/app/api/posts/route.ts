import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({items: [
    {id: 1, title:"hello world"},
    {id: 2, title:"hello world 2"},
    {id: 3, title:"hello world 3"},
  ]})
}

// export async function POST() {
//     return NextResponse.json({hello: 'abc'})
// }