'use client'

import { useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react';
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

	return<div className={""}>
		{message && <Alert color="warning">{message}</Alert>}
		<form className="flex max-w-md flex-col gap-4" onSubmit={handleForm}>
			<div>
        <div className="mb-2 block ">
          <Label
						className={"text-black dark:text-white"}
            htmlFor="url"
            value="enter url to make teeny tiny"
          />
        </div>
        <TextInput
          id="url"
          placeholder="your url"
          required
					name="url"
          type="text"
        />
      </div>
			<Button type="submit">
        make teeny tiny
      </Button>
		</form>
		<div className={'py-4 text-xs'}>{results && JSON.stringify(results)}</div>
	</div>
}


