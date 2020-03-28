import React from 'react'
import Button from 'components/Button'
import LazyBackgroundImage from 'components/LazyBackgroundImage'
import FlexContainer from 'components/FlexContainer'
import gql from 'graphql-tag'
import MoreIcon from 'components/MoreIcon'
import useBackgroundColor from 'hooks/useBackgroundColor'
import styled from 'styled-components'
import TabNav from 'components/TabNav'
import { toNumeral } from 'utils/number'
import { color, textColor, typography } from 'styles/utils'
import PlayCollectionButton from '../components/PlayCollectionButton'
import { useQuery } from '@apollo/react-hooks'
import { Outlet, useParams } from 'react-router-dom'

const ArtistName = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
`

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

const Header = styled(LazyBackgroundImage)`
  margin: -2rem -2rem 0;
  padding: 5rem 2rem 0;
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

const Artist = () => {
  const { artistId } = useParams()

  useBackgroundColor('#181818', { useGradient: false })

  const { loading, data: { artist } = {} } = useQuery(
    gql`
      query ArtistQuery($artistId: ID!) {
        artist(id: $artistId) {
          id
          name
          uri

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
    `,
    { variables: { artistId } }
  )

  return (
    loading || (
      <>
        <Header src={artist.images[0].url} component="header">
          <Listeners>{toNumeral(artist.followers.total)} Followers</Listeners>
          <ArtistName>{artist.name}</ArtistName>
          <FlexContainer alignItems="center">
            <PlayCollectionButton size="sm" uri={artist.uri} />
            <Button size="sm" kind="hollow">
              Save to your library
            </Button>
            <More size="2rem" />
          </FlexContainer>
          <Nav>
            <TabNav.NavItem to="." exact replace>
              Overview
            </TabNav.NavItem>
            <TabNav.NavItem to="related-artists" replace>
              Related artists
            </TabNav.NavItem>
          </Nav>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </>
    )
  )
}

export default Artist
