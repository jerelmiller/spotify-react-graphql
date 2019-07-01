import { useContext, useEffect } from 'react'
import BackgroundColorContext from 'components/BackgroundColorContext'

const DEFAULT_COLOR = '#181818'

const useBackgroundColor = (color, { useGradient } = {}) => {
  const {
    color: currentColor,
    setColor,
    setUsingGradient,
    usingGradient
  } = useContext(BackgroundColorContext)

  useEffect(() => {
    color && setColor(color)
    useGradient != null && setUsingGradient(useGradient)

    return () => {
      setColor(DEFAULT_COLOR)
      setUsingGradient(true)
    }
  }, [color, useGradient, setColor, setUsingGradient])

  return { color: currentColor, usingGradient }
}

export default useBackgroundColor
