import { useState } from 'react'
import CommentReaction from './CommentReaction'
import { apiURL } from '../../../context/constants'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { reportComment } from '../report/Report'
import CommentInputSecondary from './CommentInputSecondary'
import timeSince from '../../utils/timeSince/timeSince'
import CommentReactionCounter from './CommentReactionCounter'
import styles from './CommentBody.module.scss'
import Tippy from '../tippy/Tippy'
import { Link } from 'react-router-dom'

const CommentBody = ({
  commentData,
  showModalHandler,
  setCommentData,
  reportStatusHandler,
  blogId,
}) => {
  const user = useSelector((state) => state.user)

  const [showEditInputById, setShowEditInputById] = useState([])
  const [showCodeEditInputById, setShowCodeEditInputById] = useState([])
  const [editCommentText, setEditCommentText] = useState('')
  const [copyCommentHasCodeById, setCopyCommentHasCodeById] = useState([])
  const [showExtendButton, setShowExtendButton] = useState([])

  const COMMENT_CONTENT_LENGTH_TO_SHOW_EXTEND = 350

  const filterById = (arr, id) => arr.filter((item) => item !== id)

  const isShowCodeEditInput = (commentId) =>
    showCodeEditInputById.includes(commentId)

  const isShowEditInput = (commentId) => showEditInputById.includes(commentId)

  const isShowExtendButton = (commentId) => showExtendButton.includes(commentId)

  const reactCommentHandler = async (emoji, commentId) => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/blog/comment/react`
    const data = await putReactComment(url, commentId, emoji, token)
    if (!data.success) return console.log(data.message)

    setCommentData(data.comments)
  }

  const putReactComment = async (url, commentId, emoji, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({ emoji, commentId, blogId }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteComment = async (commentId) => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/blog/comment/delete`
    const data = await putDeleteComment(url, commentId, token)

    setCommentData(data.comments)
  }

  const putDeleteComment = async (url, commentId, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({ commentId, blogId }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  const editComment = async (commentId) => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/blog/comment/edit`
    const data = await putEditComment(url, commentId, token)

    setCommentData(data.comments)
  }

  const putEditComment = async (url, commentId, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({
            commentId,
            content: editCommentText,
            isCode: isShowCodeEditInput(commentId),
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    } finally {
      setEditCommentText('')
      setShowEditInputById((prev) => filterById(prev, commentId))
      setShowCodeEditInputById((prev) => filterById(prev, commentId))
    }
  }

  const showInput = (commentId) => {
    isShowEditInput(commentId)
      ? setShowEditInputById((prev) => filterById(prev, commentId))
      : setShowEditInputById((prev) => [...prev, commentId])
  }

  const copyComment = (commentId, commentContent) => {
    navigator.clipboard.writeText(commentContent)

    setCopyCommentHasCodeById((prev) => [...prev, commentId])

    const timer = setTimeout(() => {
      setCopyCommentHasCodeById([])
      clearTimeout(timer)
    }, 5000)
  }

  const extendCommentContent = (commentId) =>
    isShowExtendButton(commentId)
      ? setShowExtendButton((prev) => filterById(prev, commentId))
      : setShowExtendButton((prev) => [...prev, commentId])

  const styleCommentContent = (commentId, commentContent) => {
    const isShortComment =
      commentContent.length < COMMENT_CONTENT_LENGTH_TO_SHOW_EXTEND
    return isShortComment || isShowExtendButton(commentId)
      ? styles.commentContent
      : `${styles.commentContent} ${styles.extend}`
  }

  return (
    <>
      {commentData.map((comment) => (
        <div key={comment._id}>
          <div className={styles.commentList}>
            <Link to={`/${comment.postedBy.slug}`} className={styles.avatar}>
              <img src={comment.postedBy.photoURL} alt="" />
            </Link>
            <div className={styles.commentBody}>
              <div
                className={styleCommentContent(comment._id, comment.content)}
              >
                <div>
                  <Link to={`/${comment.postedBy.slug}`}>
                    <h5>{comment.postedBy.fullName}</h5>
                  </Link>
                  {!comment.isCode && <span>{comment.content}</span>}
                  {comment.isCode && (
                    <pre tabIndex={0}>
                      <div
                        className={styles.copyWrapper}
                        onClick={() =>
                          copyComment(comment._id, comment.content)
                        }
                      >
                        <button className={styles.copyButton}>
                          {!copyCommentHasCodeById.includes(comment._id)
                            ? 'Copy'
                            : 'Copied!'}
                        </button>
                      </div>
                      {comment.content}
                    </pre>
                  )}
                  {comment.content.length >
                    COMMENT_CONTENT_LENGTH_TO_SHOW_EXTEND && (
                    <div
                      className={styles.extendButton}
                      onClick={() => extendCommentContent(comment._id)}
                    >
                      <strong>
                        {!isShowExtendButton(comment._id)
                          ? 'Mở rộng'
                          : 'Thu nhỏ'}
                      </strong>
                      <i
                        className={
                          !isShowExtendButton(comment._id)
                            ? 'fa-regular fa-chevron-down'
                            : 'fa-regular fa-chevron-up'
                        }
                      ></i>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.commentAction}>
                <div className={styles.action}>
                  {user.isLoggedIn && (
                    <>
                      <span
                        className={styles.reactionButton}
                        onClick={() => {
                          console.log('Onclick')
                          reactCommentHandler('Thích', comment._id)
                        }}
                      >
                        <div className={styles.reaction}>
                          <CommentReaction
                            reactCommentHandler={reactCommentHandler}
                            commentId={comment._id}
                          />
                        </div>
                        Thích
                      </span>
                      <span className={styles.dot}>.</span>
                    </>
                  )}
                  {comment && comment.reacts.length > 0 && (
                    <CommentReactionCounter
                      showModalHandler={showModalHandler}
                      reactData={comment.reacts}
                    />
                  )}
                  <span className={styles.createdAt}>
                    {timeSince(comment.createdAt)}
                  </span>
                  {user.isLoggedIn && (
                    <>
                      <span className={styles.dot}>.</span>
                      <Tippy
                        button={
                          <i
                            className={`fa-solid fa-ellipsis ${styles.optionIcon}`}
                          ></i>
                        }
                        className={styles.optionWrapper}
                      >
                        {comment.postedBy._id === user.userId && (
                          <>
                            <div
                              className={styles.optionItem}
                              onClick={() => {
                                showInput(comment._id, 'edit')
                              }}
                            >
                              <i className="fa-solid fa-pen"></i>
                              <span>Sửa bình luận</span>
                            </div>
                            <div
                              className={styles.optionItem}
                              onClick={() => deleteComment(comment._id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                              <span>Xóa bình luận</span>
                            </div>
                          </>
                        )}
                        {comment.postedBy._id !== user.userId && (
                          <div
                            className={styles.optionItem}
                            onClick={() =>
                              reportStatusHandler(reportComment(comment._id))
                            }
                          >
                            <i className="fa-solid fa-flag"></i>
                            <span>Báo cáo bình luận</span>
                          </div>
                        )}
                      </Tippy>
                    </>
                  )}
                </div>
              </div>
              {isShowEditInput(comment._id) && (
                <CommentInputSecondary
                  userPhotoURL={user.photoURL}
                  showCode={isShowCodeEditInput(comment._id)}
                  showInput={() => showInput(comment._id)}
                  buttonText={'Sửa'}
                  currentComment={comment.content}
                  editComment={() => editComment(comment._id)}
                  onInput={(e) => setEditCommentText(e.target.innerText)}
                  editCommentText={editCommentText}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CommentBody
