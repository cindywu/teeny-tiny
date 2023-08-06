'use client'

import useSWR from 'swr'
import LinksCreateForm from './createForm'

const fetcher = (url: any) => fetch(url).then((res)=>res.json())

export default function LinksHTMLTable() {
  const endpoint = "/api/links"
  const {data, error, isLoading, mutate} = useSWR(
    endpoint,
    fetcher, 
    // TODO: without refreshInterval clients will not get
    // updated data from clients who are not self
    // {
    //   refreshInterval: 1000 // every second 
    // }
  )
  if (error) return "An error happened"
  if (isLoading) return "Loading..."

  const didSubmit = () => {
    mutate()
  }
  
  return (
    <>
      <LinksCreateForm didSubmit={didSubmit}/>
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
    </>
  )
}

