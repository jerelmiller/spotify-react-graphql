import { useEffect, useState } from 'react'
import useBackgroundColor from './useBackgroundColor'
import ColorThief from 'color-thief'
import { rgb, shade } from 'polished'

const useBackgroundFromImage = ref => {
  const [color, setColor] = useState()
  useBackgroundColor(color)

  useEffect(() => {
    const image = new Image()

    if (ref.current) {
      image.crossOrigin = true
      image.onload = () => {
        const colorThief = new ColorThief()
        const color = rgb(...colorThief.getColor(image))
        setColor(shade(0.2, color))
      }
      image.src = ref.current.src
    }

    return () => (image.onload = null)
  })
}

export default useBackgroundFromImage
