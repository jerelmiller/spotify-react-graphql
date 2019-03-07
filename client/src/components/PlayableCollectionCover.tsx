import React, { FC } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import useHover from '../hooks/useHover'
import LazyImage from './LazyImage'
import { ifElse, prop, value } from '../utils/fp'
import { Match, Link as RRLink } from '@reach/router'
import { FragmentComponent, GQLFragment } from '../types/shared'
import PlayAlbumMutation from './PlayAlbumMutation'
import PlayButton from './PlayButton'
import useSpotifyContext from '../hooks/useSpotifyContext'
import PlaceholderPhoto from './PlaceholderPhoto'
import { PlayableCollectionCover_collection } from './types/PlayableCollectionCover_collection'

interface Props {
  collection: PlayableCollectionCover_collection
  marginBottom?: string
  width?: string
  href: string
}

const Container = styled.div<{ marginBottom?: string }>`
  position: relative;
  margin-bottom: ${prop('marginBottom')};
`

interface AlbumLinkProps {
  visible: boolean
  to: string
}

const Link: FC<AlbumLinkProps> = ({ children, to, visible }) => (
  <Match path={to}>
    {({ match }) =>
      match ? (
        <HoverBackground visible={visible}>{children}</HoverBackground>
      ) : (
        <HoverBackground as={RRLink} to={to} visible={visible}>
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

const PlayableCollectionCover: FragmentComponent<
  Props,
  { collection: GQLFragment }
> = ({ href, collection, marginBottom, width }) => {
  const { hovered, bind } = useHover()
  const { playing, pause, play, contextUri } = useSpotifyContext()

  const coverPhoto = collection.images[1] || collection.images[0]
  const isPlayingAlbum = contextUri === collection.uri

  return coverPhoto ? (
    <Container marginBottom={marginBottom} {...bind}>
      <LazyImage
        block
        src={coverPhoto.url}
        fallback={<PlaceholderPhoto />}
        width={width}
      />
      <Link to={href} visible={hovered || (isPlayingAlbum && playing)}>
        <PlayAlbumMutation>
          {({ playAlbum }) => (
            <PlayButton
              playing={isPlayingAlbum && playing}
              onClick={e => {
                e.preventDefault()

                if (isPlayingAlbum) {
                  playing ? pause() : play()
                } else {
                  playAlbum(collection.uri!)
                }
              }}
              size="30%"
            />
          )}
        </PlayAlbumMutation>
      </Link>
    </Container>
  ) : (
    <PlaceholderPhoto marginBottom={marginBottom} />
  )
}

PlayableCollectionCover.fragments = {
  collection: gql`
    fragment PlayableCollectionCover_collection on PlayableCollection {
      uri
      images {
        url
      }
    }
  `
}

export default PlayableCollectionCover
