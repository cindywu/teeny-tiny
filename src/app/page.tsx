import Link from 'next/link'
import { getSessionUser } from './lib/session'

export default async function Home() {
  const user = await getSessionUser()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/links">
        <h1 className="text-2xl">teeny tiny</h1>
        <p>production-ready url shortner that *just works*</p>
      </Link>
      {user && <div>{JSON.stringify(user)}</div>}
    </main>
  )
}
