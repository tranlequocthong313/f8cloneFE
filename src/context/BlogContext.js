import { S } from 'maxlength-contenteditable'
import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const BlogContext = createContext()

const BlogContextProvider = ({ children }) => {
  const location = useLocation()

  const [isEditBlog, setIsEditBlog] = useState(false)
  const [isNewBlog, setIsNewBlog] = useState(false)
  const [text, setText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (location.pathname.includes('/new-blog')) {
      setIsNewBlog(true)
      setText('Xuất bản')
    } else if (location.pathname.includes('/edit-blog/')) {
      setIsEditBlog(true)
      setText('Lưu và xuất bản')
    } else {
      setIsNewBlog(false)
      setIsEditBlog(false)
      setText(null)
    }
  }, [location.pathname])

  const value = {
    isEditBlog,
    isNewBlog,
    showModal,
    setShowModal,
    isValid,
    setIsValid,
    text,
  }

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

export default BlogContextProvider
