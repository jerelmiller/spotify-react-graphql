import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const Album = ({ artistId }) => (
  <Query
    query={gql`
      query ArtistQuery($artistId: ID!) {
        artist(id: $artistId) {
          id
          name
        }
      }
    `}
    variables={{ artistId }}
  >
    {({ loading, data: { artist } }) => loading || <div>{artist.name}</div>}
  </Query>
)

export default Album
