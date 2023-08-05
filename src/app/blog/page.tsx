// 'use client'

async function getData() {
  // 1 endpoint - API ?
  const endpoint = "http://localhost:3000/api/posts"
  const res = await fetch(endpoint) // HTTP GET

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}


export default async function BlogPage(){
  const data = await getData()
  const items = data && data.items ? [...data.items] : []
  console.log({items})
  return <main>
    <h1>hello world</h1>
    <p>posts:</p>
    {items && items.map((item: {id: number, title: string}, index: number) => {
      return <li key={`post-${index}`}>{item.title}</li>
    })}
    </main>
}