import { useEffect, useState } from 'react'
import useBackgroundColor from './useBackgroundColor'
import * as Vibrant from 'node-vibrant'

const useBackgroundFromImage = src => {
  const [color, setColor] = useState()
  useBackgroundColor(color)

  useEffect(
    () => {
      if (src) {
        Vibrant.from(src)
          .getPalette()
          .then(
            pallete => console.log(pallete) || setColor(pallete.Muted.getHex())
          )
      }
    },
    [src]
  )
}

export default useBackgroundFromImage
