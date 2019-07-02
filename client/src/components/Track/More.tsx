import React, { FC, useContext } from 'react'
import MoreMenu from '../MoreMenu'
import copyToClipboard from '../../utils/copyToClipboard'
import TrackContext from './Context'
import useNotifyMutation from 'hooks/useNotifyMutation'

interface Props {}

const More: FC<Props> = () => {
  const { track } = useContext(TrackContext)
  const notify = useNotifyMutation()

  return (
    <MoreMenu size="1.25rem" align="right">
      <MoreMenu.Item>Remove From Your Library</MoreMenu.Item>
      <MoreMenu.Item>Add to Playlist</MoreMenu.Item>
      <MoreMenu.Item
        onClick={() =>
          copyToClipboard(track.link).then(() =>
            notify({ message: 'Link copied to clipboard' })
          )
        }
      >
        Copy Song Link
      </MoreMenu.Item>
    </MoreMenu>
  )
}

export default More
