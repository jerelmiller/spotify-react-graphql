import { useContext, useEffect } from 'react'
import BackgroundColorContext from '../components/BackgroundColorContext'

const DEFAULT_COLOR = '#181818'

interface Options {
  useGradient?: boolean | null
}

const useBackgroundColor = (color: string, { useGradient }: Options = {}) => {
  const {
    color: currentColor,
    setColor,
    setUsingGradient,
    usingGradient
  } = useContext(BackgroundColorContext)

  useEffect(
    () => {
      color && setColor(color)
      useGradient != null && setUsingGradient(useGradient)

      return () => {
        setColor(DEFAULT_COLOR)
        setUsingGradient(true)
      }
    },
    [color, useGradient]
  )

  return { color: currentColor, usingGradient }
}

export default useBackgroundColor
