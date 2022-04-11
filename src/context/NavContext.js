import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const NavContext = createContext()

const NavContextProvider = ({ children }) => {
  const location = useLocation()

  const [active, setActive] = useState(location.pathname.split('/')[1])

  useEffect(() => {
    switch (location.pathname) {
      case '/blog':
        setActive('blog')
        break
      case '/courses':
        setActive('courses')
        break
      case '/learning-path':
        setActive('learning-path')
        break
      case '/about-us':
        setActive('about-us')
        break
      case '/careers':
        setActive('careers')
        break
      case '/bookmark-post':
        setActive('bookmark-post')
        break
      case '/':
        setActive('home')
        break
      default:
        setActive(null)
    }
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
