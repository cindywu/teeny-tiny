'use client'

import Link from 'next/link'

export default function LogoutForm() {
	const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const data = Object.fromEntries(formData)
		const JSONData = JSON.stringify(data)
		const endpoint = "/api/auth/logout/"
		const options = {
			method: 'POST',
			header: {
				"Content-Type": "application/json"
			},
			body: JSONData
		}
		const response = await fetch(endpoint, options)
		if (response.status === 200) {
			window.location.href="/login"
		}
	}

	return<div className={"w-64"}>
		<form className={"flex flex-col"} onSubmit={handleForm}>
      <div>are you sure you want to logout?</div>
			<button className={'p-4 bg-blue-700 mt-4 text-white'} type="submit">yes, continue</button>
      <Link href='/'>no, go home.</Link>
		</form>
	</div>
}