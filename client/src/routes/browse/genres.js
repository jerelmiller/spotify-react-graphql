import React from 'react'
import gql from 'graphql-tag'
import useBackgroundColor from 'hooks/useBackgroundColor'
import CategoryTile from 'components/CategoryTile'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import { useQuery } from '@apollo/react-hooks'

const Genres = () => {
  useBackgroundColor('#272527')

  const {
    loading,
    data: { categories }
  } = useQuery(gql`
    query GenresQuery($limit: Int, $offset: Int) {
      categories(limit: $limit, offset: $offset) {
        edges {
          node {
            id
            ...CategoryTile_category
          }
        }
      }
    }

    ${CategoryTile.fragments.category}
  `)

  return (
    <>
      <PageTitle>Genres & Moods</PageTitle>
      <TileGrid minWidth="180px">
        {loading ||
          categories.edges.map(({ node }) => (
            <CategoryTile key={node.id} category={node} />
          ))}
      </TileGrid>
    </>
  )
}

export default Genres
