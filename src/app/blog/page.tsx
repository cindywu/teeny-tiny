import getDomain from '@/app/lib/getDomain'
import BlogCard from './card'

import { helloWorld } from '@/app/lib/db'

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
  const dbHello = await helloWorld()
  const items = data && data.items ? [...data.items] : []
  return <main>
    <h1>hello world</h1>
    <p>DB Response: {JSON.stringify(dbHello)}</p>
    <p>posts:</p>
    {items && items.map((item: {id: number, title: string}, index: number) => {
      return <BlogCard key={`post-${index}`} title={item.title}/>
    })}
    </main>
}

// defaults to nodejs
// edge should be faster, efficienter, closer to end users

// export const revalidate = 10 // seconds
// next.js route segment config 
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

export const runtime = 'edge' 
export const preferredRegion = 'pdx1'