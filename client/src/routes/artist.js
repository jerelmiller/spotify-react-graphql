import React from 'react'
import LazyImage from 'components/LazyImage'
import gql from 'graphql-tag'
import useBackgroundColor from 'hooks/useBackgroundColor'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { prop } from 'utils/fp'

const Container = styled.div`
  position: relative;
`

const Header = styled(LazyImage)`
  margin: -2rem -2rem 0;
  padding: 2rem;
  background-image: url(${prop('src')});
  background-position: 50%;
  background-size: cover;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(rgba(0, 0, 0, 0) -30%, #181818);
  }
`

const Album = ({ artistId }) => {
  useBackgroundColor('#181818')

  return (
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
            <Header src={artist.images[0].url} as="header">
              <div>1200 monthly listeners</div>
              {artist.name}
            </Header>
          </Container>
        )
      }
    </Query>
  )
}

export default Album
