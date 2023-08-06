import { notFound, redirect } from 'next/navigation' 
import { getShortLinkRecord } from '@/app/lib/db'

export default async function ShortPage({ params }: { params: any }) {
  const { short } = params
  if (!short) {
    notFound()
  }
  const [record] = await getShortLinkRecord(short)
  if (!record) {
    notFound() // 404
  }

  const { url } = record

  if (!url) {
    notFound()
  }
  return <h1>{url}</h1>
}