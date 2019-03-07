import { FC } from 'react'
import gql from 'graphql-tag'

export type GQLFragment = ReturnType<typeof gql>

export interface FragmentDefinition {
  [key: string]: GQLFragment
}

type Component<Props> = FC<Props>

export type FragmentComponent<
  Props,
  Fragments extends FragmentDefinition
> = Component<Props> & {
  fragments?: Fragments
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
