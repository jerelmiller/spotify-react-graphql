import React from 'react'
import Artist from 'components/Artist'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import { Query } from 'react-apollo'

const Artists = () => (
  <Query
    query={gql`
      query ArtistsQuery($limit: Int!, $after: String) {
        viewer {
          followedArtists(limit: $limit, after: $after) {
            edges {
              node {
                id
                ...Artist_artist
              }
            }
          }
        }
      }

      ${Artist.fragments.artist}
    `}
    variables={{ limit: 50 }}
  >
    {({ loading, data: { viewer } }) => (
      <>
        <PageTitle>Artists</PageTitle>
        <TileGrid minWidth="200px">
          {loading ||
            viewer.followedArtists.edges.map(({ node }) => (
              <Artist key={node.id} artist={node} />
            ))}
        </TileGrid>
      </>
    )}
  </Query>
)

export default Artists
