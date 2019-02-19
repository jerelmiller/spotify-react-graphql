import { ComponentType, NamedExoticComponent } from 'react'

interface FragmentDefinition {
  [key: string]: any
}

type Component<Props> = ComponentType<Props> | NamedExoticComponent<Props>

export type FragmentComponent<
  Props,
  Fragments extends FragmentDefinition = {}
> = Component<Props> & {
  fragments?: Fragments
}
