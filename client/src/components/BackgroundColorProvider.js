import React, { useState } from 'react'
import BackgroundColorContext from './BackgroundColorContext'

const DEFAULT_COLOR = '#181818'

const BackgroundColorProvider = ({ children }) => {
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [usingGradient, setUsingGradient] = useState(true)

  return (
    <BackgroundColorContext.Provider
      value={{ color, setColor, setUsingGradient, usingGradient }}
    >
      {children}
    </BackgroundColorContext.Provider>
  )
}

export default BackgroundColorProvider
