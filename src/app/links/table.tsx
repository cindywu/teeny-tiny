'use client'

import useSWR from 'swr'
import LinksCreateForm from './createForm'
import { Table } from 'flowbite-react';

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
      <Table>
        <Table.Head>
          <Table.HeadCell>
            ID
          </Table.HeadCell>
          <Table.HeadCell>
            URL
          </Table.HeadCell>
          <Table.HeadCell>
            Teeny Tiny Link
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data && data.map((link: any, index: number) => {
            return(
              <Table.Row 
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={`link-item-${link.id}-${index}`}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {link.id}
                </Table.Cell>
                <Table.Cell>
                  {link.url}
                </Table.Cell>
                <Table.Cell>
                  t-tiny.vercel.app/{link.short}
                </Table.Cell>
            </Table.Row>
          )})}
        </Table.Body>
      </Table>

      {/* <table>
        <tbody>
          {data && data.map((link: any, index: number) => {
            return <tr key={`link-item-${link.id}-${index}`}>
              <td>{link.id}</td>
              <td>{link.url}</td>
            </tr>
          })}
        </tbody>
      </table> */}
    </>
  )
}
