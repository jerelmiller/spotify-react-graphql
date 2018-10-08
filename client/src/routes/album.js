import React from 'react'
import LazyImage from 'components/LazyImage'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Query } from 'react-apollo'

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`

const imageFor = album =>
  album.images.find(({ width }) => width === 300) || album.images[0]

const Album = ({ albumId }) => (
  <Query
    query={gql`
      query AlbumQuery($albumId: ID!) {
        album(id: $albumId) {
          id
          name

          images {
            url
            width
          }

          tracks {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `}
    variables={{ albumId }}
  >
    {({ loading, data: { album } }) =>
      loading || (
        <Container>
          <LazyImage src={imageFor(album).url} width="300px" />
        </Container>
      )
    }
  </Query>
)

export default Album
