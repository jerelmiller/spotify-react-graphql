import React, { FC, useContext } from 'react'
import MoreMenu from '../MoreMenu'
import copyToClipboard from '../../utils/copyToClipboard'
import Notify from '../NotifyMutation'
import TrackContext from './Context'

interface Props {}

const More: FC<Props> = () => {
  const { track } = useContext(TrackContext)

  return (
    <MoreMenu size="1.25rem" align="right">
      <MoreMenu.Item>Remove From Your Library</MoreMenu.Item>
      <MoreMenu.Item>Add to Playlist</MoreMenu.Item>
      <Notify>
        {({ notify }) => (
          <MoreMenu.Item
            onClick={() =>
              copyToClipboard(track.link).then(() =>
                notify({ message: 'Link copied to clipboard' })
              )
            }
          >
            Copy Song Link
          </MoreMenu.Item>
        )}
      </Notify>
    </MoreMenu>
  )
}

export default More
