import React from 'react'
import BackgroundFromImage from 'components/BackgroundFromImage'
import LazyImage from 'components/LazyImage'
import PlaceholderPhoto from 'components/PlaceholderPhoto'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Track, { TRACK_VARIANTS } from 'components/Track'
import { Query } from 'react-apollo'
import { Link } from '@reach/router'
import { textColor } from 'styles/utils'

// TODO: Abstract all these components to share with album
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

const UserLink = styled(Link)`
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

const Playlist = ({ playlistId }) => (
  <Query
    query={gql`
      query PlaylistQuery($playlistId: ID!) {
        playlist(id: $playlistId) {
          id
          name
          images {
            url
          }
          owner {
            id
            displayName
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
    `}
    variables={{ playlistId }}
  >
    {({ loading, data: { playlist } }) =>
      loading || (
        <Container>
          {playlist.images.length > 0 && (
            <BackgroundFromImage src={playlist.images[0].url} />
          )}
          <Info>
            {playlist.images.length > 0 ? (
              <CoverPhoto block src={playlist.images[0].url} />
            ) : (
              <PlaceholderPhoto marginBottom="1rem" />
            )}
            <h2>{playlist.name}</h2>
            <div>
              <UserLink to={`/users/${playlist.owner.id}`}>
                {playlist.owner.displayName}
              </UserLink>
            </div>
            <div>
              <Typography>{playlist.tracks.pageInfo.total} Songs</Typography>
            </div>
          </Info>
          <div>
            {playlist.tracks.edges.map(({ node }) => (
              <Track key={node.id} track={node} variant={TRACK_VARIANTS.FULL} />
            ))}
          </div>
        </Container>
      )
    }
  </Query>
)

export default Playlist
