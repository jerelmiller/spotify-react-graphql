import { useState, useCallback } from 'react'

const useToggle = (initial: boolean = false) => {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn(!on), [on])
  const enable = useCallback(() => setOn(true), [])
  const disable = useCallback(() => setOn(false), [])

  return { on, off: !on, toggle, enable, disable }
}

export default useToggle
