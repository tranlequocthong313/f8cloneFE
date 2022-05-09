import { useRef } from 'react'
import styles from './CommentInputSecondary.module.scss'
import ContentEditable from '../input/ContentEditable'

const CommentInputSecondary = ({
  userPhotoURL,
  setIsCode,
  cancelInput,
  buttonText,
  submitComment,
  onInput,
  commentText,
  isCode,
}) => {
  const contentEditableRef = useRef()

  return (
    <div className={styles.replyComment}>
      <div className={styles.comment}>
        <img src={userPhotoURL} alt="ảnh đại diện" />
        <ContentEditable
          text={'Bình luận công khai...'}
          onInput={onInput}
          maxLength={'3000'}
          className={styles.commentInput}
          showCode={isCode}
          ref={contentEditableRef}
        />
        {!isCode && (
          <div className={styles.commentCode} onClick={() => setIsCode(true)}>
            <i className="fa-solid fa-code"></i>
            <span>Chèn code</span>
          </div>
        )}

        <div className={styles.submitWrapper}>
          <button
            className={styles.cancel}
            onClick={() => {
              cancelInput()
              setIsCode(false)
            }}
          >
            Hủy
          </button>
          <button
            className={
              commentText && commentText.length >= 1
                ? `${styles.submit} ${styles.active}`
                : styles.submit
            }
            onClick={submitComment}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentInputSecondary
