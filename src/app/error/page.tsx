

async function getData() {
  return {items: []}
}


export default async function BlogPage(){
  const data = await getData()
  const items = data && data.items ? [...data.items] : []
  return <main>
    <h1>hello world</h1>
    <p>posts:</p>
    {items && items.map((item: {id: number, title: string}, index: number) => {
      return <li key={`post-${index}`}>{item.title}</li>
    })}
    </main>
}