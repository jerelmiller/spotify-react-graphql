import { useEffect } from 'react'

const useTimeout = (fn: () => void, delay: number) => {
  useEffect(() => {
    const timeoutId = setTimeout(fn, delay)

    return () => clearTimeout(timeoutId)
  }, [delay, fn])
}

export default useTimeout
