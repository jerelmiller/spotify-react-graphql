import React from 'react'
import ArtistTile from 'components/ArtistTile'
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

      ${ArtistTile.fragments.artist}
    `}
    variables={{ limit: 50 }}
  >
    {({ loading, data: { viewer } }) => (
      <>
        <PageTitle>Artists</PageTitle>
        <TileGrid minWidth="160px">
          {loading ||
            viewer.followedArtists.edges.map(({ node }) => (
              <ArtistTile key={node.id} artist={node} />
            ))}
        </TileGrid>
      </>
    )}
  </Query>
)

export default Artists
