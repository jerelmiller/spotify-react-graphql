import React from 'react'
import AppMain from './AppMain'
import AppSidebar from './AppSidebar'
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

const Footer = styled.footer`
  grid-area: footer;
  background: #282828;
`

const AppLayout = ({ children }) => (
  <Query
    query={gql`
      query AppLayoutQuery {
        viewer {
          ...AppSidebar_viewer
        }
      }

      ${AppSidebar.fragments.viewer}
    `}
  >
    {({ loading, data: { viewer } }) => (
      <Container>
        <AppSidebar loading={loading} viewer={viewer} />
        <AppMain>{children}</AppMain>
        <Footer />
      </Container>
    )}
  </Query>
)

export default AppLayout
