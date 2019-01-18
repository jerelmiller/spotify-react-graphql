import styled from './styled-components'
import { prop } from '../utils/fp'

export interface Props {
  fill?: boolean
  gap?: string
  minWidth: string
}

const TileGrid = styled.div<Props>`
  display: grid;
  grid-gap: ${prop('gap')};
  grid-template-columns: repeat(
    ${({ fill }) => (fill ? 'auto-fit' : 'auto-fill')},
    minmax(${prop('minWidth')}, 1fr)
  );
`

TileGrid.defaultProps = {
  gap: '2.5rem 1rem',
  fill: true
}

export default TileGrid
