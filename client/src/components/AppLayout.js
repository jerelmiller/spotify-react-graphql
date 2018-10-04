import React from 'react'
import Avatar from './Avatar'
import AppMain from './AppMain'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Query } from 'react-apollo'

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    'sidebar main'
    'footer footer';
  grid-template-columns: 220px 1fr;
  grid-template-rows: 1fr auto;
`

const Sidebar = styled.aside`
  grid-area: sidebar;
  background: #121212;
  color: #fff;
`

const Footer = styled.footer`
  grid-area: footer;
  background: #282828;
`

const AppLayout = ({ children }) => (
  <Query
    query={gql`
      query AppLayoutQuery {
        viewer {
          user {
            id
            displayName
            images {
              url
            }
          }
        }
      }
    `}
  >
    {({ loading, data: { viewer } }) => (
      <Container>
        <Sidebar>
          {loading || (
            <>
              <Avatar image={viewer.user.images[0]} />
              {viewer.user.displayName}
            </>
          )}
        </Sidebar>
        <AppMain>{children}</AppMain>
        <Footer />
      </Container>
    )}
  </Query>
)

export default AppLayout
