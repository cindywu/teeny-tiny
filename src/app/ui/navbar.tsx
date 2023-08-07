'use client';

import { Dropdown, Navbar } from 'flowbite-react';
import Image from 'next/image'
import Link from 'next/link'

export function NavbarForUser() {
  return (
    <Navbar
      fluid
      rounded
      justify-between
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <Image
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          width={36}
          height={40}
          src="/favicon.ico"
        />
        <span className="text-black self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Teeny Tiny
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={
             <Image
              alt="Flowbite React Logo"
              className="mr-3 h-6 sm:h-9"
              width={36}
              height={40}
              src="/favicon.ico"
            />
          }
        >
          <Dropdown.Item>
            <Link href='/'>Dashboard</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href='/links'>Links</Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link href='/logout'>Logout</Link>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="#"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="/links">
          Links
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export function NavbarForAnon() {
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="https://teeny-tiny.vercel.app">
        <Image
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          width={36}
          height={40}
          src="/favicon.ico"
        />
        <span className="text-black self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Teeny Tiny
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link href="/links">
          Links
        </Navbar.Link>
        <Navbar.Link href="/register">
          Sign up
        </Navbar.Link>
        <Navbar.Link href="/login">
          Login
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

