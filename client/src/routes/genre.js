import React from 'react'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import PlaylistTile from 'components/PlaylistTile'
import { Query } from 'react-apollo'

const Genre = ({ genreId }) => (
  <Query
    query={gql`
      query GenreQuery($categoryId: ID!, $limit: Int!, $offset: Int!) {
        playlistsByCategory(
          categoryId: $categoryId
          limit: $limit
          offset: $offset
        ) {
          edges {
            node {
              id
              ...PlaylistTile_playlist
            }
          }
        }
      }

      ${PlaylistTile.fragments.playlist}
    `}
    variables={{ categoryId: genreId, limit: 50, offset: 0 }}
  >
    {({ loading, data: { playlistsByCategory } }) => (
      <>
        <PageTitle>Ya</PageTitle>
        <TileGrid minWidth="180px">
          {loading ||
            playlistsByCategory.edges.map(({ node }) => (
              <PlaylistTile key={node.id} playlist={node} />
            ))}
        </TileGrid>
      </>
    )}
  </Query>
)

export default Genre