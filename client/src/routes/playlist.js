import React from 'react'
import BackgroundFromImage from 'components/BackgroundFromImage'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
        }
      }
    `}
    variables={{ playlistId }}
  >
    {({ loading, data: { playlist } }) =>
      loading || (
        <>
          {playlist.images.length > 0 && (
            <BackgroundFromImage src={playlist.images[0].url} />
          )}
        </>
      )
    }
  </Query>
)

export default Playlist
