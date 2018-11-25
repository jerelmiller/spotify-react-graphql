import { useState, useEffect } from 'react'

const useLazyImage = src => {
  const [loaded, setLoaded] = useState(false)

  useEffect(
    () => {
      setLoaded(false)

      if (!src) {
        return
      }

      const img = new window.Image()
      img.onload = () => setLoaded(true)
      img.src = src

      return () => {
        img.onload = null
      }
    },
    [src]
  )

  return loaded
}

export default useLazyImage
