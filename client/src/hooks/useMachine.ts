import { useState, useMemo, useEffect } from 'react'
import { StateMachine, EventObject, interpret } from 'xstate'

const useMachine = <Context, Schema, Event extends EventObject>(
  machine: StateMachine<Context, Schema, Event>
) => {
  const [current, setCurrent] = useState(machine.initialState)

  const service = useMemo(
    () =>
      interpret(machine)
        .onTransition(state => {
          if (state.changed) {
            setCurrent(state)
          }
        })
        .start(),
    []
  )

  useEffect(() => {
    return () => {
      service.stop()
    }
  }, [])

  return { current, send: service.send }
}

export default useMachine
