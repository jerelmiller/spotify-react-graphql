import { SyntheticEvent } from 'react'

type EventHandler<Event extends SyntheticEvent> =
  | ((e: Event) => void)
  | undefined

export const composeHandlers = <Event extends SyntheticEvent>(
  ...fns: EventHandler<Event>[]
) => (e: Event) => fns.forEach(fn => fn && fn(e))
