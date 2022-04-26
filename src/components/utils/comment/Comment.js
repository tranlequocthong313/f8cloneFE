import { useState, useRef } from 'react'
import styles from './Comment.module.scss'
import CommentHeader from './CommentHeader'
import CommentInput from './CommentInput'
import CommentBody from './CommentBody'
import CommentModal from './CommentModal'
import { useSelector } from 'react-redux'
import MainToast from '../toast/MainToast'
import ScrollToTop from '../scroll/ScrollToTop'

const Comment = ({
  submitComment,
  commentData,
  commentInput,
  onInput,
  setCommentData,
  blogId,
}) => {
  const commentRef = useRef()
  const user = useSelector((state) => state.user)

  const [showSubmit, setShowSubmit] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reportStatus, setReportStatus] = useState({
    isSuccess: false,
    show: false,
  })

  const SHOW_SCROLL_TO_TOP_OFFSET = 1000
  const scrollToTop = () =>
    commentRef.current.scrollTop >= SHOW_SCROLL_TO_TOP_OFFSET
      ? setVisible(true)
      : setVisible(false)

  return (
    <>
      {showModal && <CommentModal showModal={() => setShowModal(false)} />}

      <div className={styles.container}>
        <div className={styles.content} ref={commentRef} onScroll={scrollToTop}>
          <CommentHeader commentData={commentData} />
          {user.isLoggedIn && (
            <CommentInput
              showCode={showCode}
              showSubmit={showSubmit}
              onInput={onInput}
              setShowSubmit={setShowSubmit}
              setShowCode={setShowCode}
              commentInput={commentInput}
              submitComment={submitComment}
              userPhotoURL={user.photoURL}
              blogId={blogId}
            />
          )}
          {commentData.length > 0 && (
            <CommentBody
              commentData={commentData}
              userPhotoURL={user.photoURL}
              showModal={setShowModal}
              setCommentData={setCommentData}
              blogId={blogId}
              s
            />
          )}
        </div>
        {visible && (
          <ScrollToTop
            onScroll={() =>
              commentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
            }
          />
        )}
      </div>
      <MainToast
        status={reportStatus}
        setCreateStatus={() =>
          setReportStatus((prev) => {
            return {
              ...prev,
              show: false,
            }
          })
        }
        successText={'Đã gửi báo cáo tới quản trị viên'}
        failText={'Gửi báo cáo không thành công'}
      />
    </>
  )
}

export default Comment
