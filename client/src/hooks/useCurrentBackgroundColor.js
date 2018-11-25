import { useContext } from 'react'
import BackgroundColorContext from 'components/BackgroundColorContext'

const useCurrentBackgroundColor = () => {
  const { color } = useContext(BackgroundColorContext)

  return color
}

export default useCurrentBackgroundColor
