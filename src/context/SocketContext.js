import React, { createContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { apiURL } from './constants'

export const SocketContext = createContext()

const SocketContextProvider = ({ children }) => {
  const socket = useRef()
  const { userId } = useSelector((state) => state.user)

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(apiURL, { transports: ['websocket'] })
    }

    if (socket.current && userId) {
      socket.current.emit('join', {
        userId,
      })
    }
  }, [socket, userId])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
