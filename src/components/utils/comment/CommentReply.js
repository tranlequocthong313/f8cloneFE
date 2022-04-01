import styles from './CommentReply.module.scss'
import noPhotoURL from '../../../asset/nobody_m.256x256.jpg'
import CommentReaction from './CommentReaction'
import CommentReactionCounter from './CommentReactionCounter'
import timeSinceHandler from '../timeSinceHandler/timeSinceHandler'
import CommentInputSecondary from './CommentInputSecondary'

const CommentReply = ({
  commentId,
  replyCommentData,
  styleCommentContent,
  copyHandler,
  isCopy,
  extendHandler,
  reactCommentHandler,
  extend,
  showReplyInputHandler,
  showModalHandler,
  showOptionHandler,
  editComment,
  editCommentHandler,
  setEditComment,
  showEditInputHandler,
  showCodeEditHandler,
  showCodeEdit,
  user,
  showEdit,
  showReply,
  showCodeReply,
  showCodeReplyHandler,
  reportCommentHandler,
  reportStatusHandler,
  deleteComment,
  showOption,
}) => {
  const STRING_LENGTH_EXTEND = 350 // Content length > 350 => show extend

  return (
    commentId === replyCommentData.commentId &&
    replyCommentData.replies.map(reply => (
      <div
        className={`${styles.commentList} ${styles.replyCommentList}`}
        key={reply._id}
      >
        <div className={styles.avatar}>
          <img
            src={
              !reply.postedBy.photoURL ? noPhotoURL : reply.postedBy.photoURL
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
                <pre tabIndex="0">
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
              {reply.reacts.length > 0 && (
                <CommentReactionCounter
                  showModalHandler={showModalHandler}
                  reactData={reply.reacts}
                />
              )}
              <span className={styles.dot}>.</span>
              <span
                className={styles.reactionButton}
                onClick={() => showReplyInputHandler(reply._id)}
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
                              showEditInputHandler(reply._id)
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
                            reportStatusHandler(reportCommentHandler(reply._id))
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

          {showReply.includes(reply._id) && !showEdit.includes(reply._id) && (
            <CommentInputSecondary
              id={reply._id}
              userPhotoURL={user.photoURL}
              showCode={showCodeReply.includes(reply._id)}
              showCodeHandler={() => showCodeReplyHandler(reply._id)}
              showInputHandler={() => showReplyInputHandler(reply._id)}
              buttonText={'Trả lời'}
              firstString={reply.postedBy.fullName}
            />
          )}

          {showEdit.includes(reply._id) && !showReply.includes(reply._id) && (
            <CommentInputSecondary
              id={reply._id}
              userPhotoURL={user.photoURL}
              showCode={showCodeEdit.includes(reply._id)}
              showCodeHandler={() => showCodeEditHandler(reply._id)}
              showInputHandler={() => showEditInputHandler(reply._id)}
              buttonText={'Sửa'}
              firstString={reply.content}
              editCommentHandler={() => editCommentHandler(reply._id)}
              onInput={e => setEditComment(e.target.innerText)}
              editComment={editComment}
            />
          )}
        </div>
      </div>
    ))
  )
}

export default CommentReply
