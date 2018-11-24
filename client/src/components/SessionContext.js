import { createContext } from 'react'

const SessionContext = createContext({ authenticated: false, restored: false })

export default SessionContext
