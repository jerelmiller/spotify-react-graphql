import React from 'react'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import PlaylistTile from 'components/PlaylistTile'
import TileGrid from 'components/TileGrid'
import useBackgroundColor from 'hooks/useBackgroundColor'
import { useQuery } from '@apollo/react-hooks'

const RouteBrowseFeatured = () => {
  useBackgroundColor('#1A101C')

  const {
    loading,
    data: { featuredPlaylists } = {}
  } = useQuery(gql`
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
  `)

  return (
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
  )
}

export default RouteBrowseFeatured
