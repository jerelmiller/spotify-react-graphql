import styled from 'styled-components'
import { prop } from 'utils/fp'

const TileGrid = styled.div`
  display: grid;
  grid-gap: ${prop('gap')};
  grid-template-columns: repeat(auto-fit, minmax(${prop('minWidth')}, 1fr));
`

TileGrid.defaultProps = {
  gap: '2.5rem 1rem'
}

export default TileGrid
