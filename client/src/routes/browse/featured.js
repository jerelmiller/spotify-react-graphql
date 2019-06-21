import React from 'react'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import PlaylistTile from 'components/PlaylistTile'
import TileGrid from 'components/TileGrid'
import useBackgroundColor from 'hooks/useBackgroundColor'
import { Query } from 'react-apollo'

const RouteBrowseFeatured = () => {
  useBackgroundColor('#1A101C')

  return (
    <Query
      query={gql`
        query BrowseFeaturedQuery($limit: Int, $offset: Int) {
          featuredPlaylists(limit: $limit, offset: $offset) {
            title
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
    >
      {({ loading, data: { featuredPlaylists } }) =>
        loading || (
          <>
            <PageTitle>{featuredPlaylists.title}</PageTitle>
            <TileGrid minWidth="180px">
              {featuredPlaylists.edges.map(({ node }) => (
                <PlaylistTile key={node.id} playlist={node} />
              ))}
            </TileGrid>
          </>
        )
      }
    </Query>
  )
}

export default RouteBrowseFeatured
