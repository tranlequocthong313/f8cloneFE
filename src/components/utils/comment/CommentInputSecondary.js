import { useRef, useEffect } from 'react'
import styles from './CommentInputSecondary.module.scss'
import noPhotoURL from '../../../asset/nobody_m.256x256.jpg'
import ContentEditable from '../content-editable/ContentEditable'

const CommentInputSecondary = ({
  userPhotoURL,
  showCode,
  showInputHandler,
  buttonText,
  firstString,
  editCommentHandler,
  onInput,
  editComment,
  setShowCodeEditReply,
}) => {
  const contentEditableRef = useRef()

  useEffect(() => {
    if (editComment && editComment.length === 0) {
      contentEditableRef.current.innerText = ''
    }
  }, [editComment])

  return (
    <div className={styles.replyComment}>
      <div className={styles.comment}>
        <img src={userPhotoURL ? userPhotoURL : noPhotoURL} alt="" />
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
            <i className="bi bi-code-slash"></i>
            <span>Chèn code</span>
          </div>
        )}

        <div className={styles.submitWrapper}>
          <button
            className={styles.cancel}
            onClick={() => {
              showInputHandler()
              setShowCodeEditReply()
            }}
          >
            Hủy
          </button>
          <button
            className={
              editComment && editComment.length >= 1
                ? `${styles.submit} ${styles.active}`
                : styles.submit
            }
            onClick={buttonText === 'Sửa' ? editCommentHandler : null}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentInputSecondary
