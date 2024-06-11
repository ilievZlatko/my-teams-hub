import { useState, useEffect } from 'react'

// This is an example custom hook that fetches data from an API
// and returns it as an array of strings
// TODO: Remove later when you add your own custom hook
const useExample = () => {
  const [data, setData] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch example data from an API or perform any other side effect
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.example.com/data')
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error: any) {
        setError(error.message)
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
  }
}

export default useExample
