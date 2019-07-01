import { useContext } from 'react'
import ScrollContainerContext from 'components/ScrollContainerContext'

const useScrollContainer = () => useContext(ScrollContainerContext)

export default useScrollContainer
