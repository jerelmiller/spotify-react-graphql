import { useContext, useEffect } from 'react'
import BackgroundColorContext from 'components/BackgroundColorContext'

const DEFAULT_COLOR = '#181818'

const useBackgroundColor = color => {
  const { setColor } = useContext(BackgroundColorContext)

  useEffect(
    () => {
      color && setColor(color)

      return () => setColor(DEFAULT_COLOR)
    },
    [color]
  )
}

export default useBackgroundColor
