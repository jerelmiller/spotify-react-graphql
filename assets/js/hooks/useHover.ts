import { useState, useCallback } from 'react'

const useHover = () => {
  const [hovered, setHover] = useState(false)

  const onMouseOver = useCallback(() => setHover(true), [])
  const onMouseLeave = useCallback(() => setHover(false), [])

  return { hovered, bind: { onMouseLeave, onMouseOver } }
}

export default useHover
