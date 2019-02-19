import { FC } from 'react'
import gql from 'graphql-tag'

type GQLFragment = ReturnType<typeof gql>

interface FragmentDefinition {
  [key: string]: GQLFragment
}

type Component<Props> = FC<Props>

export type FragmentComponent<
  Props,
  Fragments extends FragmentDefinition = {}
> = Component<Props> & {
  fragments?: Fragments
}
