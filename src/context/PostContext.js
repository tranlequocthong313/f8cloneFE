import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
  const location = useLocation()

  const [isEditPost, setIsEditPost] = useState(false)
  const [isNewPost, setIsNewPost] = useState(false)
  const [text, setText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const isNewPostPathName = location.pathname.includes('/new-post')
    const isEditPostPathName = location.pathname.includes('/edit-post/')

    if (isNewPostPathName) {
      setIsNewPost(true)
      setText('Xuất bản')
    } else if (isEditPostPathName) {
      setIsEditPost(true)
      setText('Lưu và xuất bản')
    } else {
      setIsNewPost(false)
      setIsEditPost(false)
      setText(null)
    }
  }, [location.pathname])

  const value = {
    isEditPost,
    isNewPost,
    showModal,
    setShowModal,
    isValid,
    setIsValid,
    text,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

export default PostContextProvider
