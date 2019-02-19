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
