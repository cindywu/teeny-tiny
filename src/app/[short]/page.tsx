import { notFound, redirect } from 'next/navigation' 
import { getShortLinkRecord } from '@/app/lib/db'
import getDomain from '../lib/getDomain'

export const runtime = 'edge'

async function triggerVisit(linkId: number){
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({linkId: linkId})
  }
  const domain = getDomain()
  const endpoint = `${domain}/api/visits/`
  return await fetch(endpoint, options)
}

export default async function ShortPage({ params }: { params: any }) {
  const { short } = params
  if (!short) {
    notFound()
  }
  const [record] = await getShortLinkRecord(short)
  
  if (!record) {
    notFound() // 404
  }
  console.log({record})

  const { url, id } = record

  if (!url) {
    notFound()
  }
  if (id) { 
    await triggerVisit(id)
  }
  redirect(url)
  // return <h1 className={'p-8 text-center'}>{url}</h1>
}