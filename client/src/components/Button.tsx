import { HTMLProps } from 'react'
import { css, ClassNames } from '@emotion/core'
import { color, lighten, typography } from '../styles/utils'
import { FC } from 'react'
import { Omit } from '../types/shared'
import { Theme } from '../styles/theme'

const GREEN = color('green')
const LIGHT_GREEN = lighten(0.1, 'green')

const SIZES = {
  sm: (theme: Theme) => css`
    ${typography('xs', { theme })};
    font-weight: normal;
    letter-spacing: 1.2px;
    padding: 0.75rem 3rem;
  `,
  md: (theme: Theme) => css`
    ${typography('md', { theme })};
    padding: 0.75rem 3rem;
  `
}

const KINDS = {
  primary: (theme: Theme) => css`
    color: ${color('white', { theme })};
    background: ${GREEN({ theme })};
    border-color: ${GREEN({ theme })};

    &:hover {
      background: ${LIGHT_GREEN({ theme })};
      border-color: ${LIGHT_GREEN({ theme })};
    }
  `,
  ghost: (theme: Theme) => css`
    color: ${color('white', { theme })};
    background: transparent;
    border-color: ${color('offWhite', { theme })};

    &:hover {
      border-color: ${color('white', { theme })};
    }
  `
}

interface OwnProps {
  className?: string
  size: 'sm' | 'md'
  kind: 'primary' | 'ghost'
}

export type Props = OwnProps & Omit<HTMLProps<HTMLButtonElement>, 'size'>

const Button: FC<Props> = ({ className, children, size, kind, ...props }) => (
  <ClassNames<Theme>>
    {({ css, cx, theme }) => (
      <button
        className={cx('sp-btn', className)}
        css={css`
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

          ${SIZES[size](theme)};
          ${KINDS[kind](theme)};

          &.sp-btn + .sp-btn {
            margin-left: 1rem;
          }
        `}
        {...props}
      >
        {children}
      </button>
    )}
  </ClassNames>
)

export default Button
