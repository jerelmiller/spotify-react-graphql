import { useEffect, useState } from 'react'
import useBackgroundColor from './useBackgroundColor'
import ColorThief from 'color-thief'
import { rgb, shade } from 'polished'

const DEFAULT_COLOR = '#181818'

const useBackgroundFromImage = (src: string) => {
  const [color, setColor] = useState(DEFAULT_COLOR)
  useBackgroundColor(color)

  useEffect(() => {
    const img = new Image()

    if (src) {
      img.crossOrigin = 'true'
      img.onload = () => {
        const colorThief = new ColorThief()
        const color = rgb(...colorThief.getColor(img))
        setColor(shade(0.3, color))
      }
      img.src = src
    }

    return () => {
      img.onload = null
    }
  })
}

export default useBackgroundFromImage
