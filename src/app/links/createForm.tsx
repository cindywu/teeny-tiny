'use client'

import { useState } from 'react'

export default function LinksCreateForm({ didSubmit }: { didSubmit: () => void } ) {
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
		setResults(result)
		if (didSubmit) {
			didSubmit()
		}
	}

	return<div className={"w-64"}>
		<form className={"flex flex-col"} onSubmit={handleForm}>
			<input className={'p-4 text-black text-xs'} type="text" name="url" placeholder="your url" defaultValue="https://github.com/cindywu/teeny-tiny"/>
			<button className={'p-4 bg-blue-700 mt-4 text-white'} type="submit">make url teeny tiny</button>
		</form>
		<div className={'py-4 text-xs'}>{results && JSON.stringify(results)}</div>
		
	</div>
}