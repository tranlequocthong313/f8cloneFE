import { useState } from 'react'
import CommentReaction from './CommentReaction'
import { apiURL } from '../../../context/constants'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { reportCommentHandler } from '../report/Report'
import CommentInputSecondary from './CommentInputSecondary'
import timeSinceHandler from '../../utils/timeSinceHandler/timeSinceHandler'
import CommentReactionCounter from './CommentReactionCounter'
import noPhotoURL from '../../../asset/nobody_m.256x256.jpg'
import styles from './CommentBody.module.scss'

const CommentBody = ({
  commentData,
  showModalHandler,
  setCommentData,
  reportStatusHandler,
}) => {
  const [showOption, setShowOption] = useState(null)
  const [showEdit, setShowEdit] = useState([])
  const [showReply, setShowReply] = useState([])
  const [showCodeEdit, setShowCodeEdit] = useState([])
  const [showCodeReply, setShowCodeReply] = useState([])
  const [editComment, setEditComment] = useState('')
  const [isCopy, setIsCopy] = useState([])
  const [extend, setExtend] = useState([])

  const user = useSelector(state => state.user)

  const STRING_LENGTH_EXTEND = 350 // Content length > 350 => show extend

  const reactCommentHandler = async (emoji, commentId) => {
    try {
      const token = Cookies.get('token')

      if (!token) return

      const res = await fetch(`${apiURL}/blog/comment/react`, {
        method: 'PUT',
        body: JSON.stringify({ emoji, commentId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      console.log(data)
      setCommentData(data.comments)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteComment = async commentId => {
    try {
      const token = Cookies.get('token')

      if (!token) return

      const res = await fetch(`${apiURL}/blog/comment/delete`, {
        method: 'PUT',
        body: JSON.stringify({ commentId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      console.log(data)
      setCommentData(data.comments)
    } catch (error) {
      console.log(error)
    }
  }

  const editCommentHandler = async commentId => {
    try {
      const token = Cookies.get('token')

      if (!token) return

      const obj = {
        commentId: commentId,
        content: editComment,
        isCode: showCodeEdit.includes(commentId),
      }

      const res = await fetch(`${apiURL}/blog/comment/edit`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      console.log(data)
      setCommentData(data.comments)
    } catch (error) {
      console.log(error)
    }

    setEditComment('')
    setShowEdit(prev => prev.filter(item => item !== commentId))
    setShowCodeEdit(prev => prev.filter(item => item !== commentId))
  }

  const showInputHandler = (commentId, option) => {
    if (!commentId || !option) return

    const isReply = showReply.includes(commentId)
    const isEdit = showEdit.includes(commentId)

    if (option === 'reply' && !isReply && !isEdit) {
      setShowReply(prev => [...prev, commentId])
    } else if (option === 'reply' && !isReply && isEdit) {
      setShowReply(prev => [...prev, commentId])
      setShowEdit(prev => prev.filter(item => item !== commentId))
    } else if (option === 'reply' && isReply) {
      setShowReply(prev => prev.filter(item => item !== commentId))
    } else if (option === 'edit' && !isEdit && isReply) {
      setShowEdit(prev => [...prev, commentId])
      setShowReply(prev => prev.filter(item => item !== commentId))
    } else if (option === 'edit' && !isEdit && !isReply) {
      setShowEdit(prev => [...prev, commentId])
      return
    } else {
      setShowEdit(prev => prev.filter(item => item !== commentId))
    }
  }

  const showCodeEditReplyHandler = (commentId, option) => {
    const isReply = showCodeReply.includes(commentId)
    const isEdit = showCodeEdit.includes(commentId)

    if (option === 'reply' && !isReply && !isEdit) {
      setShowCodeReply(prev => [...prev, commentId])
    } else if (option === 'reply' && !isReply && isEdit) {
      setShowCodeReply(prev => [...prev, commentId])
      setShowCodeEdit(prev => prev.filter(item => item !== commentId))
    } else if (option === 'reply' && isReply) {
      setShowCodeReply(prev => prev.filter(item => item !== commentId))
    } else if (option === 'edit' && !isEdit && isReply) {
      setShowCodeEdit(prev => [...prev, commentId])
      setShowCodeReply(prev => prev.filter(item => item !== commentId))
    } else if (option === 'edit' && !isEdit && !isReply) {
      setShowCodeEdit(prev => [...prev, commentId])
    } else {
      setShowCodeEdit(prev => prev.filter(item => item !== commentId))
    }
  }

  const copyHandler = (commentId, commentContent) => {
    navigator.clipboard.writeText(commentContent)
    setIsCopy(prev => {
      return [...prev, commentId]
    })
    const timer = setTimeout(() => {
      setIsCopy([])
      clearTimeout(timer)
    }, 5000)
  }

  const extendHandler = commentId => {
    const isExtend = extend.includes(commentId)

    if (isExtend) {
      setExtend(prev => prev.filter(item => item !== commentId))
    } else {
      setExtend(prev => [...prev, commentId])
    }
  }

  const showOptionHandler = commentId => {
    if (showOption === commentId) {
      setShowOption(null)
    } else {
      setShowOption(commentId)
    }
  }

  const styleCommentContent = (commentId, commentContent) => {
    if (commentContent.length < STRING_LENGTH_EXTEND) {
      return styles.commentContent
    } else if (
      commentContent.length > STRING_LENGTH_EXTEND &&
      extend.includes(commentId)
    ) {
      return styles.commentContent
    } else {
      return `${styles.commentContent} ${styles.extend}`
    }
  }

  console.log(commentData)

  return commentData.map(comment => (
    <div key={comment._id}>
      <div className={styles.commentList}>
        <div className={styles.avatar}>
          <img
            src={
              !comment.postedBy.photoURL
                ? noPhotoURL
                : comment.postedBy.photoURL
            }
            alt=""
          />
        </div>
        <div className={styles.commentBody}>
          <div className={styleCommentContent(comment._id, comment.content)}>
            <div>
              <h5>{comment.postedBy.fullName}</h5>
              {!comment.isCode && <span>{comment.content}</span>}
              {comment.isCode && (
                <pre tabIndex={0}>
                  <div
                    className={styles.copyWrapper}
                    onClick={() => copyHandler(comment._id, comment.content)}
                  >
                    <button className={styles.copyButton}>
                      {!isCopy.includes(comment._id) ? 'Copy' : 'Copied!'}
                    </button>
                  </div>
                  {comment.content}
                </pre>
              )}
              {comment.content.length > STRING_LENGTH_EXTEND && (
                <div
                  className={styles.extendButton}
                  onClick={() => extendHandler(comment._id)}
                >
                  <strong>
                    {!extend.includes(comment._id) ? 'Mở rộng' : 'Thu nhỏ'}
                  </strong>
                  <i
                    className={
                      !extend.includes(comment._id)
                        ? 'bi bi-chevron-down'
                        : 'bi bi-chevron-up'
                    }
                  ></i>
                </div>
              )}
            </div>
          </div>

          <div className={styles.commentAction}>
            <div className={styles.action}>
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
              {comment && comment.reacts.length > 0 && (
                <CommentReactionCounter
                  showModalHandler={showModalHandler}
                  reactData={comment.reacts}
                />
              )}
              <span className={styles.dot}>.</span>
              <span
                className={styles.reactionButton}
                onClick={() => showInputHandler(comment._id, 'reply')}
              >
                Trả lời
              </span>
              <span className={styles.dot}>.</span>
              <span className={styles.createdAt}>
                {timeSinceHandler(comment.createdAt)}
              </span>
              <span
                className={styles.optionButton}
                onClick={() => showOptionHandler(comment._id)}
              >
                <span className={styles.dot}>.</span>
                <span className={styles.optionIcon}>
                  <i className="bi bi-three-dots"></i>
                </span>
                {showOption === comment._id && (
                  <div className={styles.optionWrapper}>
                    <ul className={styles.list}>
                      {comment.postedBy._id === user.userId && (
                        <>
                          <li
                            onClick={() => {
                              showInputHandler(comment._id, 'edit')
                            }}
                          >
                            <i className="bi bi-pencil-fill"></i>
                            <span>Sửa bình luận</span>
                          </li>
                          <li onClick={() => deleteComment(comment._id)}>
                            <i className="bi bi-trash-fill"></i>
                            <span>Xóa bình luận</span>
                          </li>
                        </>
                      )}
                      {comment.postedBy._id !== user.userId && (
                        <li
                          onClick={() =>
                            reportStatusHandler(
                              reportCommentHandler(comment._id)
                            )
                          }
                        >
                          <i className="bi bi-flag-fill"></i>
                          <span>Báo cáo bình luận</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </span>
            </div>
          </div>

          {showReply.includes(comment._id) &&
            !showEdit.includes(comment._id) && (
              <CommentInputSecondary
                userPhotoURL={user.photoURL}
                showCode={showCodeReply.includes(comment._id)}
                setShowCodeEditReply={() =>
                  showCodeEditReplyHandler(comment._id, 'reply')
                }
                showInputHandler={() => showInputHandler(comment._id, 'reply')}
                buttonText={'Trả lời'}
                firstString={comment.postedBy.fullName}
              />
            )}

          {showEdit.includes(comment._id) &&
            !showReply.includes(comment._id) && (
              <CommentInputSecondary
                userPhotoURL={user.photoURL}
                showCode={showCodeEdit.includes(comment._id)}
                setShowCodeEditReply={() =>
                  showCodeEditReplyHandler(comment._id, 'edit')
                }
                showInputHandler={() => showInputHandler(comment._id, 'edit')}
                buttonText={'Sửa'}
                firstString={comment.content}
                editCommentHandler={() => editCommentHandler(comment._id)}
                onInput={e => setEditComment(e.target.innerText)}
                editComment={editComment}
              />
            )}
        </div>
      </div>
      {comment.replies.length > 0 && (
        <div className={styles.viewReplies}>
          <span className={styles.repliesCount}>
            Xem {comment.replies.length} câu trả lời
            <i className="bi bi-chevron-down"></i>
            {/* <i className="bi bi-chevron-up"></i> */}
          </span>

          {comment.replies.map(reply => (
            <div className={styles.commentList} key={reply._id}>
              <div className={styles.avatar}>
                <img
                  src={
                    !reply.postedBy.photoURL
                      ? noPhotoURL
                      : reply.postedBy.photoURL
                  }
                  alt=""
                />
              </div>
              <div className={styles.commentBody}>
                <div className={styleCommentContent(reply._id, reply.content)}>
                  <div>
                    <h5>{reply.postedBy.fullName}</h5>
                    {!reply.isCode && <span>{reply.content}</span>}
                    {reply.isCode && (
                      <pre tabIndex={0}>
                        <div
                          className={styles.copyWrapper}
                          onClick={() => copyHandler(reply._id, reply.content)}
                        >
                          <button className={styles.copyButton}>
                            {!isCopy.includes(reply._id) ? 'Copy' : 'Copied!'}
                          </button>
                        </div>
                        {reply.content}
                      </pre>
                    )}
                    {reply.content.length > STRING_LENGTH_EXTEND && (
                      <div
                        className={styles.extendButton}
                        onClick={() => extendHandler(reply._id)}
                      >
                        <strong>
                          {!extend.includes(reply._id) ? 'Mở rộng' : 'Thu nhỏ'}
                        </strong>
                        <i
                          className={
                            !extend.includes(reply._id)
                              ? 'bi bi-chevron-down'
                              : 'bi bi-chevron-up'
                          }
                        ></i>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.commentAction}>
                  <div className={styles.action}>
                    <span
                      className={styles.reactionButton}
                      onClick={() => {
                        console.log('Onclick')
                        reactCommentHandler('Thích', reply._id)
                      }}
                    >
                      <div className={styles.reaction}>
                        <CommentReaction
                          reactCommentHandler={reactCommentHandler}
                          commentId={reply._id}
                        />
                      </div>
                      Thích
                    </span>
                    {comment && reply.reacts.length > 0 && (
                      <CommentReactionCounter
                        showModalHandler={showModalHandler}
                        reactData={reply.reacts}
                      />
                    )}
                    <span className={styles.dot}>.</span>
                    <span
                      className={styles.reactionButton}
                      onClick={() => showInputHandler(reply._id, 'reply')}
                    >
                      Trả lời
                    </span>
                    <span className={styles.dot}>.</span>
                    <span className={styles.createdAt}>
                      {timeSinceHandler(reply.createdAt)}
                    </span>
                    <span
                      className={styles.optionButton}
                      onClick={() => showOptionHandler(reply._id)}
                    >
                      <span className={styles.dot}>.</span>
                      <span className={styles.optionIcon}>
                        <i className="bi bi-three-dots"></i>
                      </span>
                      {showOption === reply._id && (
                        <div className={styles.optionWrapper}>
                          <ul className={styles.list}>
                            {reply.postedBy._id === user.userId && (
                              <>
                                <li
                                  onClick={() => {
                                    showInputHandler(reply._id, 'edit')
                                  }}
                                >
                                  <i className="bi bi-pencil-fill"></i>
                                  <span>Sửa bình luận</span>
                                </li>
                                <li onClick={() => deleteComment(reply._id)}>
                                  <i className="bi bi-trash-fill"></i>
                                  <span>Xóa bình luận</span>
                                </li>
                              </>
                            )}
                            {reply.postedBy._id !== user.userId && (
                              <li
                                onClick={() =>
                                  reportStatusHandler(
                                    reportCommentHandler(reply._id)
                                  )
                                }
                              >
                                <i className="bi bi-flag-fill"></i>
                                <span>Báo cáo bình luận</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </span>
                  </div>
                </div>

                {showReply.includes(reply._id) &&
                  !showEdit.includes(reply._id) && (
                    <CommentInputSecondary
                      userPhotoURL={user.photoURL}
                      showCode={showCodeReply.includes(reply._id)}
                      setShowCodeEditReply={() =>
                        showCodeEditReplyHandler(reply._id, 'reply')
                      }
                      showInputHandler={() =>
                        showInputHandler(reply._id, 'reply')
                      }
                      buttonText={'Trả lời'}
                      firstString={reply.postedBy.fullName}
                    />
                  )}

                {showEdit.includes(reply._id) &&
                  !showReply.includes(reply._id) && (
                    <CommentInputSecondary
                      userPhotoURL={user.photoURL}
                      showCode={showCodeEdit.includes(reply._id)}
                      setShowCodeEditReply={() =>
                        showCodeEditReplyHandler(reply._id, 'edit')
                      }
                      showInputHandler={() =>
                        showInputHandler(reply._id, 'edit')
                      }
                      buttonText={'Sửa'}
                      firstString={reply.content}
                      editCommentHandler={() => editCommentHandler(reply._id)}
                      onInput={e => setEditComment(e.target.innerText)}
                      editComment={editComment}
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ))
}

export default CommentBody
