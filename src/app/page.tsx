import Link from 'next/link'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/links">
        <h1 className="text-2xl">teeny tiny</h1>
        <p>production-ready url shortner that *just works*</p>
      </Link>
    </main>
  )
}
