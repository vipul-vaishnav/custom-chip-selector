import { useState, useEffect } from 'react'

type UseFetchReturn<T> = {
  data: Array<T>
  isLoading: boolean
  isError: boolean
}

export function useFetch<T>(func: () => Promise<Array<T>>): UseFetchReturn<T> {
  const [data, setData] = useState<Array<T>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const res = await func()
        setData(res)
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  return {
    data,
    isError,
    isLoading
  }
}
