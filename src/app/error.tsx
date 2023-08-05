'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: {error: any, reset: any}) {
    
  // useEffect is possible here bc of 'use client'
  useEffect(() => {
    console.log({error})
  },[error])

  const retryRequestHandler = () => {
    reset()
  }
  
  return<div>
  <h2>Something went wrong!</h2>
  <button onClick={retryRequestHandler}>Retry request</button>
  </div>
}