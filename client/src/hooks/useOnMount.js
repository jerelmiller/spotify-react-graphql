import { useEffect } from 'react'

const useOnMount = fn => {
  useEffect(fn, [])
}

export default useOnMount
