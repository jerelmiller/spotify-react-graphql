import React from 'react'
import LazyImage from 'components/LazyImage'
import gql from 'graphql-tag'
import styled from 'styled-components'
import ReleaseYear from 'components/ReleaseYear'
import Track from 'components/Track'
import { Query } from 'react-apollo'
import { Link } from '@reach/router'
import { textColor } from 'styles/utils'

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
`

const CoverPhoto = styled(LazyImage)`
  margin-bottom: 1rem;
`

const Info = styled.div`
  text-align: center;
`

const ArtistLink = styled(Link)`
  font-size: 0.9rem;
  color: ${textColor('muted')};
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${textColor('primary')};
    border-bottom-color: ${textColor('primary')};
  }
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

          label

          releaseDate {
            ...ReleaseYear_releaseDate
          }

          primaryArtist {
            id
            name
          }

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
      ${ReleaseYear.fragments.releaseDate}
    `}
    variables={{ albumId }}
  >
    {({ loading, data: { album } }) =>
      loading || (
        <Container>
          <Info>
            <CoverPhoto block src={imageFor(album).url} width="300px" />
            <h2>{album.name}</h2>
            <ArtistLink to={`/artists/${album.primaryArtist.id}`}>
              {album.primaryArtist.name}
            </ArtistLink>
            <ReleaseYear releaseDate={album.releaseDate} />
          </Info>
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
