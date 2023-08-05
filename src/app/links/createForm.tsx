'use client'

import { useState } from 'react'

export default function LinksCreateForm() {
	const [results, setResults] = useState(null)
	const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const data = Object.fromEntries(formData)
		const JSONData = JSON.stringify(data)
		const endpoint = "/api/links/"
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

	return<>
		<form className={"flex flex-col"} onSubmit={handleForm}>
			<input className={'p-4 text-black'} type="text" name="url" placeholder="your url" defaultValue="https://github.com/cindywu/teeny-tiny"/>
			<button className={'p-4'} type="submit">make url teeny tiny</button>
		</form>
		{results && JSON.stringify(results)}
	</>
}