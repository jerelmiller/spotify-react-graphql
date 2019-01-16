import React from 'react'
import BackgroundFromImage from 'components/BackgroundFromImage'
import LazyImage from 'components/LazyImage'
import gql from 'graphql-tag'
import styled from 'styled-components'
import ReleaseYear from 'components/ReleaseYear'
import PlaceholderPhoto from 'components/PlaceholderPhoto'
import Track, { TRACK_VARIANTS } from 'components/Track'
import { Query } from 'react-apollo'
import { Link } from '@reach/router'
import { textColor } from 'styles/utils'

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 1rem;
`

const CoverPhoto = styled(LazyImage)`
  margin-bottom: 1rem;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
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

const Typography = styled.span`
  font-size: 0.8rem;
  font-weight: 300;
  color: ${textColor('muted')};
  text-transform: uppercase;
`

const imageFor = album => album.images[0]

const Album = ({ albumId }) => (
  <Query
    query={gql`
      query AlbumQuery($albumId: ID!) {
        album(id: $albumId) {
          id
          name
          type
          uri

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
            pageInfo {
              total
            }
          }
        }
      }

      ${Track.fragments.track}
      ${ReleaseYear.fragments.releaseDate}
    `}
    variables={{ albumId }}
  >
    {({ loading, data: { album } }) => {
      const image = loading ? {} : album.images[0]

      return (
        loading || (
          <Container>
            {image && <BackgroundFromImage src={imageFor(album).url} />}
            <Info>
              {image ? (
                <CoverPhoto block src={imageFor(album).url} width="300px" />
              ) : (
                <PlaceholderPhoto marginBottom="1rem" />
              )}
              <h2>{album.name}</h2>
              <div>
                <ArtistLink to={`/artists/${album.primaryArtist.id}`}>
                  {album.primaryArtist.name}
                </ArtistLink>
              </div>
              <div>
                <Typography>
                  <ReleaseYear releaseDate={album.releaseDate} /> &middot;{' '}
                  {album.tracks.pageInfo.total} Songs
                </Typography>
              </div>
            </Info>
            <div>
              {album.tracks.edges.map(({ node }) => (
                <Track
                  key={node.id}
                  track={node}
                  playContext={album.uri}
                  variant={
                    album.type === 'COMPILATION'
                      ? TRACK_VARIANTS.VARIOUS_ARTIST
                      : TRACK_VARIANTS.SIMPLE
                  }
                />
              ))}
            </div>
          </Container>
        )
      )
    }}
  </Query>
)

export default Album
