import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const NavContext = createContext()

const NavContextProvider = ({ children }) => {
  const location = useLocation()

  const [active, setActive] = useState(location.pathname.split('/')[1])

  useEffect(() => {
    location.pathname === '' && setActive('home')
  }, [location.pathname])

  const activeHandler = (tab) => {
    setActive(tab)
  }

  const contextValue = {
    active,
    activeHandler,
  }

  return (
    <NavContext.Provider value={contextValue}>{children}</NavContext.Provider>
  )
}

export default NavContextProvider
