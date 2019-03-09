import { HTMLProps } from 'react'
import styled, { css } from 'styled-components'
import { color, lighten, typography } from '../styles/utils'

const GREEN = color('green')
const LIGHT_GREEN = lighten(0.1, 'green')

const SIZES = {
  sm: css`
    ${typography('xs')};
    font-weight: normal;
    letter-spacing: 1.2px;
    padding: 0.75rem 3rem;
  `,
  md: css`
    ${typography('md')};
    padding: 0.75rem 3rem;
  `
}

const KINDS = {
  primary: css`
    color: ${color('white')};
    background: ${GREEN};
    border-color: ${GREEN};

    &:hover {
      background: ${LIGHT_GREEN};
      border-color: ${LIGHT_GREEN};
    }
  `,
  ghost: css`
    color: ${color('white')};
    background: transparent;
    border-color: ${color('offWhite')};

    &:hover {
      border-color: ${color('white')};
    }
  `
}

interface OwnProps {
  size: 'sm' | 'md'
  kind: 'primary' | 'ghost'
}

export type Props = OwnProps & HTMLProps<HTMLButtonElement>

const Button = styled.button.attrs({
  className: 'sp-btn'
})<OwnProps>`
  border-radius: 10rem;
  font-size: 1.25rem;
  border: 2px solid;
  text-transform: uppercase;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    transform: scale(1.05);
  }

  ${({ size, kind }) => css`
    ${SIZES[size]};
    ${KINDS[kind]};
  `};

  &.sp-btn + .sp-btn {
    margin-left: 1rem;
  }
`

export default Button
