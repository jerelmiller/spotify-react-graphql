import React from 'react'
import LazyImage from 'components/LazyImage'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Track from 'components/Track'
import { Query } from 'react-apollo'

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
`

const imageFor = album =>
  album.images.find(({ width }) => width === 300) || album.images[0]

const Album = ({ albumId }) => (
  <Query
    query={gql`
      query AlbumQuery($albumId: ID!) {
        album(id: $albumId) {
          id
          name

          images {
            url
            width
          }

          tracks {
            edges {
              node {
                id
                ...Track_track
              }
            }
          }
        }
      }

      ${Track.fragments.track}
    `}
    variables={{ albumId }}
  >
    {({ loading, data: { album } }) =>
      loading || (
        <Container>
          <LazyImage src={imageFor(album).url} width="300px" />
          <div>
            {album.tracks.edges.map(({ node }) => (
              <Track key={node.id} track={node} />
            ))}
          </div>
        </Container>
      )
    }
  </Query>
)

export default Album
