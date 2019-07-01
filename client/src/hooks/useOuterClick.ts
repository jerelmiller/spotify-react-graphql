import { RefObject, useEffect } from 'react'

const useOuterClick = (
  ref: RefObject<HTMLElement>,
  onOuterClick: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        onOuterClick(e)
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [onOuterClick, ref])
}

export default useOuterClick
