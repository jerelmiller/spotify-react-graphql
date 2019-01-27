import { useEffect } from 'react'

const useOnMount = (fn: () => void) => {
  useEffect(() => {
    fn()
  }, [])
}

export default useOnMount
