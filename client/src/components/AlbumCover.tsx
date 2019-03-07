import React, { FC } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import useHover from '../hooks/useHover'
import LazyImage from './LazyImage'
import { ifElse, prop, value } from '../utils/fp'
import { Match, Link } from '@reach/router'
import { FragmentComponent, GQLFragment } from '../types/shared'
import { AlbumCover_album } from './types/AlbumCover_album'
import PlayAlbumMutation from './PlayAlbumMutation'
import PlayButton from './PlayButton'
import useSpotifyContext from '../hooks/useSpotifyContext'
import PlaceholderPhoto from './PlaceholderPhoto'

interface Props {
  album: AlbumCover_album
  marginBottom?: string
}

const Photo = styled(LazyImage)<{ marginBottom?: string }>`
  display: block;
  margin-bottom: ${prop('marginBottom')};
`

const Container = styled.div`
  position: relative;
`

interface AlbumLinkProps {
  id: AlbumCover_album['id']
  visible: boolean
}

const AlbumLink: FC<AlbumLinkProps> = ({ children, id, visible }) => (
  <Match path="/albums/:id">
    {({ match }) =>
      match ? (
        <HoverBackground visible={visible}>{children}</HoverBackground>
      ) : (
        <HoverBackground as={Link} to={`/albums/${id}`} visible={visible}>
          {children}
        </HoverBackground>
      )
    }
  </Match>
)

const HoverBackground = styled.div<{ visible: boolean; to?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
  opacity: ${ifElse(prop('visible'), value(1), value(0))};
  transition: opacity 0.15s ease-in-out;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const AlbumCover: FragmentComponent<Props, { album: GQLFragment }> = ({
  album,
  marginBottom
}) => {
  const { hovered, bind } = useHover()
  const { playing, pause, play, contextUri } = useSpotifyContext()

  const coverPhoto = album.images[1] || album.images[0]
  const isPlayingAlbum = contextUri === album.uri

  return coverPhoto ? (
    <Container {...bind}>
      <Photo
        src={coverPhoto.url}
        marginBottom={marginBottom}
        fallback={<PlaceholderPhoto />}
      />
      <AlbumLink id={album.id} visible={hovered || (isPlayingAlbum && playing)}>
        <PlayAlbumMutation>
          {({ playAlbum }) => (
            <PlayButton
              playing={isPlayingAlbum && playing}
              onClick={e => {
                e.preventDefault()

                if (isPlayingAlbum) {
                  playing ? pause() : play()
                } else {
                  playAlbum(album.uri!)
                }
              }}
              size="30%"
            />
          )}
        </PlayAlbumMutation>
      </AlbumLink>
    </Container>
  ) : (
    <PlaceholderPhoto marginBottom={marginBottom} />
  )
}

AlbumCover.fragments = {
  album: gql`
    fragment AlbumCover_album on Album {
      id
      uri
      images {
        url
      }
    }
  `
}

export default AlbumCover
