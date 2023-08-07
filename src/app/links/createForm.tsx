'use client'

import { useState } from 'react'
import { Label, TextInput } from 'flowbite-react';
import { Alert } from "flowbite-react"

export default function LinksCreateForm({ didSubmit }: { didSubmit: () => void } ) {
	const [results, setResults] = useState(null)
	const [message, setMessage] = useState(null)
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
		if (result.message) {
			setMessage(result.message)
		}
	}

	return<div className={"p-8"}>
		{message && <Alert color="warning">{message}</Alert>}
		<form className="flex max-w-md flex-col gap-4" onSubmit={handleForm}>
			<div>
        <div className="mb-2 block ">
          <label
						className={"text-sm dark:text-white"}
            htmlFor="url"
          >enter url to make teeny tiny</label>
        </div>
        <input
					className={'text-black text-sm'}
          id="url"
          placeholder="your url"
          required
					name="url"
          type="text"
					autoComplete="off"
        />
      </div>
			<button className={'p-4 text-sm bg-blue-800 hover:bg-blue-700 text-white'} type="submit">
        make teeny tiny
      </button>
		</form>
		{/* <div className={'py-4 text-xs'}>{results && JSON.stringify(results)}</div> */}
	</div>
}


