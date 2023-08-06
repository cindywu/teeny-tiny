import { getShortLinkRecord } from '@/app/lib/db'
export default async function ShortPage({ params }: { params: any }) {
  const { short } = params
  const [record] = await getShortLinkRecord(short)
  if (!record) {
    return <h1>Not Found</h1>
  }
  return <>
    {JSON.stringify(record)}
  </>
}