import React, { createContext, useState } from 'react'

export const ModalContext = createContext()

const ModalContextProvider = ({ children }) => {
  const [showError, setShowError] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const onHideError = () => setShowError(false)
  const onShowError = () => setShowError(true)

  const onHideConfirm = () => setShowConfirm(false)
  const onShowConfirm = () => setShowConfirm(true)

  const value = {
    showError,
    showConfirm,
    onHideConfirm,
    onShowConfirm,
    onHideError,
    onShowError,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
