import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

const Artist = ({ artist }) => <Container>{artist.name}</Container>

Artist.fragments = {
  artist: gql`
    fragment Artist_artist on Artist {
      id
      name
    }
  `
}

export default Artist
