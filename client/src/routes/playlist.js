import React from 'react'
import BackgroundFromImage from 'components/BackgroundFromImage'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Track from 'components/Track'
import { Query } from 'react-apollo'
import { Link } from '@reach/router'
import { textColor } from 'styles/utils'
import PlayableCollectionCover from '../components/PlayableCollectionCover'

// TODO: Abstract all these components to share with album
const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 1rem;
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
          uri
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
                ...TrackAlbumLink_track
                ...TrackArtistLink_track
                ...TrackDuration_track
                ...TrackExplicitBadge_track
                ...TrackName_track
              }
            }
            pageInfo {
              total
            }
          }

          ...PlayableCollectionCover_collection
        }
      }

      ${Track.fragments.track}
      ${Track.AlbumLink.fragments.track}
      ${Track.ArtistLink.fragments.track}
      ${Track.Duration.fragments.track}
      ${Track.ExplicitBadge.fragments.track}
      ${Track.Name.fragments.track}
      ${PlayableCollectionCover.fragments.collection}
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
            <PlayableCollectionCover
              href={`/playlists/${playlist.id}`}
              collection={playlist}
              marginBottom="1rem"
            />
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
              <Track
                key={node.id}
                columns="auto 1fr auto auto"
                track={node}
                playContext={playlist.uri}
              >
                <Track.Name />
                <Track.More />
                <Track.Duration />
                <Track.Details>
                  <Track.ExplicitBadge /> <Track.ArtistLink /> &middot;{' '}
                  <Track.AlbumLink />
                </Track.Details>
              </Track>
            ))}
          </div>
        </Container>
      )
    }
  </Query>
)

export default Playlist
