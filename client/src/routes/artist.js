import React from 'react'
import Button from 'components/Button'
import LazyImage from 'components/LazyImage'
import FlexContainer from 'components/FlexContainer'
import gql from 'graphql-tag'
import MoreIcon from 'components/MoreIcon'
import PageTitle from 'components/PageTitle'
import useBackgroundColor from 'hooks/useBackgroundColor'
import styled from 'styled-components'
import TabNav from 'components/TabNav'
import { toNumeral } from 'utils/number'
import { color, textColor, typography } from 'styles/utils'
import { Query } from 'react-apollo'
import { prop } from 'utils/fp'

const Listeners = styled.span`
  color: ${textColor('muted')};
  text-transform: uppercase;
  letter-spacing: 1px;

  ${typography('xs')};
`

const More = styled(MoreIcon)`
  margin-left: 1rem;
  cursor: pointer;
`
const Nav = styled(TabNav)`
  margin-top: 2rem;
`

const Header = styled(LazyImage)`
  margin: -2rem -2rem 0;
  padding: 5rem 2rem 0;
  background-image: url(${prop('src')});
  background-position: 50% 33%;
  background-size: cover;
  position: relative;
  color: ${color('white')}
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > * {
    position: relative;
  }

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

const Content = styled.section`
  padding: 2rem 0;
`

const Artist = ({ artistId, children }) => {
  useBackgroundColor('#181818', { useGradient: false })

  return (
    <Query
      query={gql`
        query ArtistQuery($artistId: ID!) {
          artist(id: $artistId) {
            id
            name

            followers {
              total
            }

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
          <>
            <Header src={artist.images[0].url} as="header">
              <Listeners>
                {toNumeral(artist.followers.total)} Followers
              </Listeners>
              <PageTitle>{artist.name}</PageTitle>
              <FlexContainer alignItems="center">
                <Button size="sm" kind="primary">
                  Play
                </Button>
                <Button size="sm" kind="ghost">
                  Save to your library
                </Button>
                <More size="2rem" />
              </FlexContainer>
              <Nav>
                <TabNav.NavItem to="./" exact>
                  Overview
                </TabNav.NavItem>
                <TabNav.NavItem to="related-artists">
                  Related artists
                </TabNav.NavItem>
                <TabNav.NavItem to="about">About</TabNav.NavItem>
              </Nav>
            </Header>
            <Content>{children}</Content>
          </>
        )
      }
    </Query>
  )
}

export default Artist
