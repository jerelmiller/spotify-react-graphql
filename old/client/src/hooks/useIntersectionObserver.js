import { useEffect, useState } from 'react'

const useIntersectionObserver = (
  onIntersect,
  { root, rootMargin, threshold } = {}
) => {
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!ref) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry], observer) => onIntersect(entry, observer),
      {
        root,
        rootMargin,
        threshold
      }
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, onIntersect, root, rootMargin, threshold])

  return setRef
}

export default useIntersectionObserver
