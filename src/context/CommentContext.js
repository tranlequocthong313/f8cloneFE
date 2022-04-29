import React, { createContext } from 'react'

export const CommentContext = createContext()

const CommentContextProvider = ({ children }) => {
  const canModifyComment = (currentUserId, authorId) =>
    currentUserId === authorId

  const isReplying = (activeComment, commentId) =>
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === commentId

  const isEditing = (activeComment, commentId) =>
    activeComment &&
    activeComment.type === 'editing' &&
    activeComment.id === commentId

  const appendData = (data) => {
    const formData = new FormData()
    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value = JSON.stringify(value)
      }
      formData.append(`${key}`, value)
    }
    return formData
  }

  const getReplies = (comments, commentId) => {
    return (
      comments &&
      comments
        .filter((comment) => comment && comment.parentComment === commentId)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    )
  }

  const value = {
    getReplies,
    appendData,
    isEditing,
    isReplying,
    canModifyComment,
  }

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  )
}

export default CommentContextProvider
