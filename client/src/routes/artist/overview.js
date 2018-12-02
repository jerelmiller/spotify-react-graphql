import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const Overview = ({ artistId }) => (
  <Query
    query={gql`
      query ArtistOverviewQuery($artistId: ID!, $limit: Int!) {
        artist(id: $artistId) {
          id
          topTracks(limit: $limit) {
            id
            name
          }
        }
      }
    `}
    variables={{ artistId, limit: 5 }}
  >
    {({ loading, data }) => <h1>Popular</h1>}
  </Query>
)

export default Overview
