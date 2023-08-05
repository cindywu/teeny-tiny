// 'use client'
import getDomain from '@/app/lib/getDomain'

// fetch caching options

// force-cache - default

// revalidate: n seconds
// check every n seconds for new data 
// good for blog posts that do not require real-time updates

// no-store - triggers every time the component is rendered

async function getData() {
  // // 1 endpoint - API ?
  const domain = getDomain()
  const endpoint = `${domain}/api/posts` // -> third party api request??
  // const res = await fetch(endpoint, {next: {revalidate: 10 }}) // HTTP GET
  const res = await fetch(endpoint, {cache: 'no-store' }) // HTTP GET

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  if (res.headers.get("content-type") !== "application/json") {
    return {items: []}
  }
  return res.json()
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