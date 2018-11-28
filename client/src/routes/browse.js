import React from 'react'
import TabNav from 'components/TabNav'

const RouteBrowse = ({ children }) => (
  <>
    <header>
      <TabNav>
        <TabNav.NavItem to="featured">Featured</TabNav.NavItem>
        <TabNav.NavItem to="podcasts">Podcasts</TabNav.NavItem>
        <TabNav.NavItem to="charts">Charts</TabNav.NavItem>
        <TabNav.NavItem to="genres">Genres &amp; Moods</TabNav.NavItem>
        <TabNav.NavItem to="new-releases">New Releases</TabNav.NavItem>
        <TabNav.NavItem to="discover">Discover</TabNav.NavItem>
      </TabNav>
    </header>
    {children}
  </>
)

export default RouteBrowse
