import React from 'react'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import PlaylistTile from 'components/PlaylistTile'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

const Genre = () => {
  const { genreId } = useParams()

  const { loading, data: { category, playlistsByCategory } = {} } = useQuery(
    gql`
      query GenreQuery($categoryId: ID!, $limit: Int, $offset: Int) {
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

        category(id: $categoryId) {
          id
          name
        }
      }

      ${PlaylistTile.fragments.playlist}
    `,
    { variables: { categoryId: genreId } }
  )

  return (
    loading || (
      <>
        <PageTitle>{category.name}</PageTitle>
        <TileGrid minWidth="180px">
          {playlistsByCategory.edges.map(({ node }) => (
            <PlaylistTile key={node.id} playlist={node} />
          ))}
        </TileGrid>
      </>
    )
  )
}

export default Genre
