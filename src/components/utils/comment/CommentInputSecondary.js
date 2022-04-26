import { useRef, useEffect } from 'react'
import styles from './CommentInputSecondary.module.scss'
import ContentEditable from '../content-editable/ContentEditable'

const CommentInputSecondary = ({
  userPhotoURL,
  showCode,
  showInput,
  buttonText,
  currentComment,
  editComment,
  onInput,
  editCommentText,
  setShowCodeEditReply,
}) => {
  const contentEditableRef = useRef()

  useEffect(() => {
    const isEmptyEditCommentText = editCommentText.length === 0
    if (isEmptyEditCommentText) contentEditableRef.current.innerText = ''
  }, [editCommentText])

  return (
    <div className={styles.replyComment}>
      <div className={styles.comment}>
        <img src={userPhotoURL} alt="" />
        <ContentEditable
          text={'Bình luận công khai...'}
          onInput={onInput}
          maxLength={'3000'}
          className={styles.commentInput}
          showCode={showCode}
          ref={contentEditableRef}
        >
          <span className={styles.editComment}>{currentComment}</span>
          <span>&nbsp;</span>
        </ContentEditable>
        {!showCode && (
          <div className={styles.commentCode} onClick={setShowCodeEditReply}>
            <i className="fa-solid fa-code"></i>
            <span>Chèn code</span>
          </div>
        )}

        <div className={styles.submitWrapper}>
          <button
            className={styles.cancel}
            onClick={() => {
              showInput()
              setShowCodeEditReply()
            }}
          >
            Hủy
          </button>
          <button
            className={
              editCommentText && editCommentText.length >= 1
                ? `${styles.submit} ${styles.active}`
                : styles.submit
            }
            onClick={editComment}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentInputSecondary
