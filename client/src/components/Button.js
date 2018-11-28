import styled, { css } from 'styled-components'
import { color, typography } from 'styles/utils'

const SIZES = {
  sm: css`
    ${typography('xs')};
    font-weight: normal;
    letter-spacing: 1.2px;
    padding: 0.75rem 3rem;
  `,
  md: css``
}

const KINDS = {
  primary: css`
    color: ${color('white')};
    background: ${color('green')};
    border-color: ${color('green')};
  `,
  ghost: css`
    color: ${color('white')};
    background: transparent;
    border-color: ${color('offWhite')};
  `
}

const Button = styled.button`
  border-radius: 10rem;
  font-size: 1.25rem;
  border: 2px solid;
  text-transform: uppercase;

  ${({ size, kind }) => css`
    ${SIZES[size]};
    ${KINDS[kind]};
  `};
`

export default Button
