import { createContext } from 'react'

interface ContextProps {
  close(): void
}

const Context = createContext<ContextProps>({
  close: () => {}
})

export default Context
