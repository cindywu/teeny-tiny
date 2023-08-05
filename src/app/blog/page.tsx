// 'use client'
import getDomain from '@/app/lib/getDomain'

async function getData() {
  // // 1 endpoint - API ?
  const domain = getDomain()
  const endpoint = `${domain}/api/posts` // -> third party api request??
  const res = await fetch(endpoint) // HTTP GET

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
  // return {items: []}
}


export default async function BlogPage(){
  const data = await getData()
  const items = data && data.items ? [...data.items] : []
  console.log({items})
  console.log(process.env.PUBLIC_DOMAIN)
  return <main>
    <h1>hello world</h1>
    <p>posts:</p>
    {items && items.map((item: {id: number, title: string}, index: number) => {
      return <li key={`post-${index}`}>{item.title}</li>
    })}
    </main>
}