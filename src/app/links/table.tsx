'use client'

import useSWR from 'swr'

const fetcher = (url: any) => fetch(url).then((res)=>res.json())

export default function LinksHTMLTable() {
  const endpoint = "/api/links"
  const {data, error, isLoading} = useSWR(
    endpoint,
    fetcher, 
    {
      refreshInterval: 1000 // every second 
    }
  )
  if (error) return "An error happened"
  if (isLoading) return "Loading..."

  return (
    <div>
      <table>
        <tbody>
          {data && data.map((link: any, index: number) => {
            return <tr key={`link-item-${link.id}-${index}`}>
              <td>{link.id}</td>
              <td>{link.url}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

// old server component

// import { getLinks } from '@/app/lib/db'

// export default async function LinksHTMLTable() {
//   const linksResponse = await getLinks()
//   return <div>
//     <table>
//       <tbody>
//         {linksResponse && linksResponse.map((link: any, index: number) => {
//           return <tr key={`link-item-${link.id}-${index}`}>
//             <td>{link.id}</td>
//             <td>{link.url}</td>
//           </tr>
//         })}
//       </tbody>
//     </table>
//   </div>
// }

