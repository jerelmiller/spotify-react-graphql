import React, { FC } from 'react'
import PlayButton, { Props as PlayButtonProps } from './PlayButton'
import usePlayableCollection from '../hooks/usePlayableCollection'

interface OwnProps {
  uri: string
}

type Props = OwnProps & Pick<PlayButtonProps, 'size'>

const PlayCollectionButton: FC<Props> = ({ size, uri }) => {
  const { playing, toggle } = usePlayableCollection(uri)

  return <PlayButton size={size} playing={playing} onClick={toggle} />
}

export default PlayCollectionButton
