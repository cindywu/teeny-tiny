'use client'
import { useState } from 'react'

export default function Card({title}: {title: string}) {
    const [count, setCount] = useState<number>(1)
    const handleClick = (event: any) => {
        event.preventDefault()
        setCount(count + 1)
    }
    if (!title) {
        return <div>Empty</div>
    }
    return <div>
        <h1 onClick={handleClick}>{title}</h1>
        <p>{count}</p>
    </div>
}