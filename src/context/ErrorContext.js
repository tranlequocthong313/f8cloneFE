import React, { createContext, useState } from 'react'

export const ErrorContext = createContext()

const ErrorContextProvider = ({ children }) => {
  const [show, setShow] = useState(true)

  const onHideError = () => setShow(false)
  const onShowError = () => setShow(true)

  const value = { show, onHideError, onShowError }

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export default ErrorContextProvider
