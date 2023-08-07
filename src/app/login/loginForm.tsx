'use client'

import { useState } from 'react'

export default function LoginForm() {
	const [results, setResults] = useState(null)
	const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const data = Object.fromEntries(formData)
		const JSONData = JSON.stringify(data)
		const endpoint = "/api/auth/register"
		const options = {
			method: 'POST',
			header: {
				"Content-Type": "application/json"
			},
			body: JSONData
		}
		const response = await fetch(endpoint, options)
		const result = await response.json()
		console.log({result})
		setResults(result)
	}

	return<div className={"w-64"}>
		<form className={"flex flex-col"} onSubmit={handleForm}>
			<input className={'p-4 text-black text-xs'} type="text" name="username" placeholder="your username"/>
			<input className={'p-4 text-black text-xs'} type="password" name="password" placeholder="your password"/>
			<button className={'p-4 bg-blue-700 mt-4 text-white'} type="submit">login</button>
		</form>
		<div className={'py-4 text-xs'}>{results && JSON.stringify(results)}</div>
		
	</div>
}