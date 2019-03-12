import React, { FC, useContext } from 'react'
import MoreMenu from '../MoreMenu'
import copyToClipboard from '../../utils/copyToClipboard'
import Notify from '../NotifyMutation'
import TrackContext from './Context'
import useLocation from '../../hooks/useLocation'

interface Props {}

const More: FC<Props> = () => {
  const { track } = useContext(TrackContext)
  const { origin } = useLocation()

  return (
    <MoreMenu size="1.25rem" align="right">
      <MoreMenu.Item>Remove From Your Library</MoreMenu.Item>
      <MoreMenu.Item>Add to Playlist</MoreMenu.Item>
      <Notify>
        {({ notify }) => (
          <MoreMenu.Item
            onClick={() =>
              copyToClipboard(`${origin}/tracks/${track.id}`).then(() =>
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
