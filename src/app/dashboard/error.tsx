'use client' 
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <main className="h-screen flex flex-col items-center justify-center">
    <h2>{error.message}</h2>

    <button className="mt-8" onClick={reset}>
      Try again
    </button>
  </main>
  )
}