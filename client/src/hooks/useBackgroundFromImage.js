import { useEffect, useState } from 'react'
import useBackgroundColor from './useBackgroundColor'
import ColorThief from 'color-thief'
import { rgb, shade } from 'polished'

const useBackgroundFromImage = ref => {
  const [color, setColor] = useState()
  useBackgroundColor(color)

  useEffect(() => {
    const img = new Image()

    if (ref.current) {
      img.crossOrigin = true
      img.onload = () => {
        const colorThief = new ColorThief()
        const color = rgb(...colorThief.getColor(img))
        setColor(shade(0.3, color))
      }
      img.src = ref.current.src
    }

    return () => {
      img.onload = null
    }
  })
}

export default useBackgroundFromImage
