import { ComponentType, NamedExoticComponent } from 'react'
import gql from 'graphql-tag'

type GQLFragment = ReturnType<typeof gql>

interface FragmentDefinition {
  [key: string]: GQLFragment
}

type Component<Props> = ComponentType<Props> | NamedExoticComponent<Props>

export type FragmentComponent<
  Props,
  Fragments extends FragmentDefinition = {}
> = Component<Props> & {
  fragments?: Fragments
}
