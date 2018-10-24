import React from 'react'
import LazyImage from 'components/LazyImage'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { prop } from 'utils/fp'

const Container = styled.div`
  position: relative;
`

const CoverPhoto = styled(LazyImage)`
  position: absolute;
  top: -2rem;
  left: -2rem;
  width: calc(100% + 4rem);
  z-index: -1;
  background-image: url(${prop('src')});
  background-size: cover;
`

const Album = ({ artistId }) => (
  <Query
    query={gql`
      query ArtistQuery($artistId: ID!) {
        artist(id: $artistId) {
          id
          name

          images {
            url
            width
            height
          }
        }
      }
    `}
    variables={{ artistId }}
  >
    {({ loading, data: { artist } }) =>
      loading || (
        <Container>
          <CoverPhoto src={artist.images[0].url} as="div" />
          {artist.name}
        </Container>
      )
    }
  </Query>
)

export default Album
