import React, { FC } from 'react'
import MoreMenu from '../MoreMenu'

interface Props {}

const More: FC<Props> = () => (
  <MoreMenu size="1.25rem" align="right">
    <MoreMenu.Item>Start Radio</MoreMenu.Item>
    <MoreMenu.Item>Remove From Your Library</MoreMenu.Item>
    <MoreMenu.Item>Add to Queue</MoreMenu.Item>
    <MoreMenu.Item>Add to Playlist</MoreMenu.Item>
    <MoreMenu.Item>Copy Song Link</MoreMenu.Item>
  </MoreMenu>
)

export default More
