import styled from './styled-components'

const ExplicitBadge = styled.span.attrs({
  children: 'Explicit'
})`
  font-weight: 300;
  font-size: 0.75rem;
  color: #000;
  padding: 0 0.3rem;
  background: hsla(0, 0%, 100%, 0.6);
  text-transform: uppercase;
  border-radius: 2px;
  vertical-align: text-bottom;
`

export default ExplicitBadge
