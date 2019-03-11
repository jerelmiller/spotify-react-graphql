import React, { FC } from 'react'
import gql from 'graphql-tag'
import styled from '../styled'
import useHover from '../hooks/useHover'
import LazyImage from './LazyImage'
import { ifElse, prop, value } from '../utils/fp'
import { Match, Link } from '@reach/router'
import { FragmentComponent, GQLFragment } from '../types/shared'
import CircularPlayButton from './CircularPlayButton'
import PlaceholderPhoto from './PlaceholderPhoto'
import { PlayableCollectionCover_collection } from './types/PlayableCollectionCover_collection'
import usePlayableCollection from '../hooks/usePlayableCollection'
import isPropValid from '@emotion/is-prop-valid'

interface Props {
  collection: PlayableCollectionCover_collection
  marginBottom?: string
  width?: string
  href: string
}

interface ContainerProps {
  marginBottom?: string
}

const Container = styled.div<ContainerProps>`
  position: relative;
  margin-bottom: ${prop('marginBottom')};
`

interface AlbumLinkProps {
  visible: boolean
  to: string
}

const BackgroundLink: FC<AlbumLinkProps> = ({ children, to, visible }) => (
  <Match path={to}>
    {({ match }) =>
      match ? (
        <HoverBackground visible={visible}>{children}</HoverBackground>
      ) : (
        <HoverBackgroundLink to={to} visible={visible}>
          {children}
        </HoverBackgroundLink>
      )
    }
  </Match>
)

interface HoverBackgroundProps {
  visible: boolean
}

const HoverBackground = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'visible'
})<HoverBackgroundProps>`
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

const HoverBackgroundLink = HoverBackground.withComponent(Link)

const PlayableCollectionCover: FragmentComponent<
  Props,
  { collection: GQLFragment }
> = ({ href, collection, marginBottom, width }) => {
  const { hovered, bind } = useHover()
  const { playing, toggle } = usePlayableCollection(collection.uri!)

  const coverPhoto = collection.images[1] || collection.images[0]

  return coverPhoto ? (
    <Container marginBottom={marginBottom} {...bind}>
      <LazyImage
        block
        src={coverPhoto.url}
        fallback={<PlaceholderPhoto />}
        width={width}
      />
      <BackgroundLink to={href} visible={hovered || playing}>
        <CircularPlayButton
          playing={playing}
          onClick={e => {
            e.preventDefault()

            toggle()
          }}
          size="30%"
        />
      </BackgroundLink>
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
