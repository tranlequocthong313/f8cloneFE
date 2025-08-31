import { useRef, useEffect } from 'react'
import styles from './CommentInputSecondary.module.scss'
import noPhotoURL from '../../../asset/images/nobody_m.256x256.jpg'
import ContentEditable from '../content-editable/ContentEditable'

const CommentInputSecondary = ({
  userPhotoURL,
  showCode,
  showInput,
  buttonText,
  firstString,
  editComment,
  replyComment,
  onInput,
  commentInput,
  setShowCodeEditReply,
}) => {
  const contentEditableRef = useRef()

  useEffect(() => {
    const isEmptyCommentInput = commentInput.length === 0
    if (isEmptyCommentInput) contentEditableRef.current.innerText = ''
  }, [commentInput])

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
          <span
            className={
              buttonText !== 'Sửa' ? styles.replyUserName : styles.editComment
            }
          >
            {firstString}
          </span>
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
              commentInput && commentInput.length >= 1
                ? `${styles.submit} ${styles.active}`
                : styles.submit
            }
            onClick={buttonText === 'Sửa' ? editComment : replyComment}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentInputSecondary
