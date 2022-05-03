import { useState, useRef, useEffect, useContext } from 'react'
import styles from './CommentInput.module.scss'
import ContentEditable from '../content-editable/ContentEditable'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import { apiURL } from '../../../context/constants'
import { SocketContext } from '../../../context/SocketContext'
import { ErrorContext } from '../../../context/ErrorContext'
import { useSelector } from 'react-redux'
import ModalError from '../../utils/modal-error/ModalError'

const CommentInput = ({
  showCode,
  showSubmit,
  setShowSubmit,
  setShowCode,
  userPhotoURL,
  blog,
  setCommentData,
}) => {
  const history = useHistory()
  const contentEditableRef = useRef()
  const user = useSelector((state) => state.user)

  const { current } = useContext(SocketContext).socket
  const { onShowError } = useContext(ErrorContext)

  const [commentInput, setCommentInput] = useState('')

  useEffect(() => {
    const isEmptyCommentInput = commentInput.length === 0
    if (isEmptyCommentInput) contentEditableRef.current.innerText = ''
  }, [commentInput])

  const submitComment = async () => {
    const token = Cookies.get('token')
    if (!token) return history.push('/login')

    const url = `${apiURL}/comment`
    const data = await postComment(url, token)

    setCommentData(data.comment)

    const isCommentByBlogAuthor = data.comment.postedBy === blog.postedBy._id
    if (current && !isCommentByBlogAuthor) {
      current.emit('comment', {
        sender: user,
        postId: blog._id,
        receiver: blog,
        receiverId: blog.postedBy._id,
        commentContent: data.comment,
        description: 'đã trả lời vào bình luận của bạn',
        notificationType: 'comment',
        createdAt: new Date(),
      })
    }
  }

  const postComment = async (url, token) => {
    try {
      return (
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            post: blog._id,
            content: commentInput,
            isCode: showCode,
            commentType: 'blogs',
            postedBy: user.userId,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
      onShowError()
    } finally {
      setCommentInput('')
      setShowSubmit(false)
      setShowCode(false)
    }
  }

  return (
    <div className={styles.comment}>
      <ModalError />
      <img src={userPhotoURL} alt="ảnh đại diện" />
      <div onClick={() => setShowSubmit(true)}>
        <ContentEditable
          text={'Viết bình luận của bạn...'}
          onInput={(e) => setCommentInput(e.target.innerText)}
          maxLength={'3000'}
          className={styles.commentInput}
          showCode={showCode}
          ref={contentEditableRef}
        />
      </div>
      {showSubmit && (
        <>
          {!showCode && (
            <div
              className={styles.commentCode}
              onClick={() => setShowCode(true)}
            >
              <i className="fa-solid fa-code"></i>
              <span>Chèn code</span>
            </div>
          )}
          <div className={styles.submitWrapper}>
            <button
              className={styles.cancel}
              onClick={() => {
                setShowSubmit(false)
                setShowCode(false)
              }}
            >
              Hủy
            </button>
            <button
              className={
                commentInput && commentInput.length >= 1
                  ? `${styles.submit} ${styles.active}`
                  : styles.submit
              }
              onClick={submitComment}
            >
              Bình luận
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CommentInput
