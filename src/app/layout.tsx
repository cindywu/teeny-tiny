import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getSessionUser } from './lib/session'
import { NavbarForUser, NavbarForAnon } from './ui/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'teeny tiny',
  description: 'production-ready url shortening service',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSessionUser()
  const loggedIn = user !== null
  const Navbar = loggedIn ? <NavbarForUser/> : <NavbarForAnon />
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        {Navbar}
        {children}
      </body>
    </html>
  )
}
