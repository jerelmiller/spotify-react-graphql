import React from 'react'
import gql from 'graphql-tag'
import useBackgroundColor from 'hooks/useBackgroundColor'
import CategoryTile from 'components/CategoryTile'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import { Query } from 'react-apollo'

const Genres = () => {
  useBackgroundColor('#272527')

  return (
    <Query
      query={gql`
        query GenresQuery($limit: Int!, $offset: Int!) {
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
      `}
      variables={{ limit: 50, offset: 0 }}
    >
      {({ loading, data: { categories } }) => (
        <>
          <PageTitle>Genres & Moods</PageTitle>
          <TileGrid minWidth="180px">
            {loading ||
              categories.edges.map(({ node }) => (
                <CategoryTile key={node.id} category={node} />
              ))}
          </TileGrid>
        </>
      )}
    </Query>
  )
}

export default Genres
