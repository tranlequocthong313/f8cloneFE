import { useState, useRef, useEffect } from 'react'
import styles from './Comment.module.scss'
import CommentHeader from './CommentHeader'
import CommentInput from './CommentInput'
import CommentBody from './CommentBody'
import CommentModal from './CommentModal'
import { useSelector } from 'react-redux'
import MainToast from '../toast/MainToast'
import ScrollToTop from '../scroll/ScrollToTop'

const Comment = ({
  setShowComment,
  submitComment,
  commentData,
  commentInput,
  onInput,
  setCommentData,
  blogId,
}) => {
  const userPhotoURL = useSelector((state) => state.user.photoURL)
  const commentRef = useRef()

  const [showSubmit, setShowSubmit] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [reportStatus, setReportStatus] = useState({
    isSuccess: false,
    show: false,
  })
  const [visible, setVisible] = useState(false)

  const createStatus = (isSuccess, show) => {
    setReportStatus((prev) => {
      return {
        ...prev,
        show,
        isSuccess,
      }
    })
  }

  const reportStatusHandler = (status) =>
    status ? createStatus(true, true) : createStatus(false, true)

  const scrollToTopHandler = () => {
    const SHOW_SCROLL_TO_TOP_OFFSET = 1000

    commentRef.current.scrollTop >= SHOW_SCROLL_TO_TOP_OFFSET
      ? setVisible(true)
      : setVisible(false)
  }

  return (
    <>
      {showModal && (
        <CommentModal showModalHandler={() => setShowModal(false)} />
      )}

      <div className={styles.container}>
        <div
          className={styles.content}
          ref={commentRef}
          onScroll={scrollToTopHandler}
        >
          <CommentHeader commentData={commentData} />
          <CommentInput
            showCode={showCode}
            showSubmit={showSubmit}
            onInput={onInput}
            setShowSubmit={setShowSubmit}
            setShowCode={setShowCode}
            commentInput={commentInput}
            submitComment={submitComment}
            userPhotoURL={userPhotoURL}
            blogId={blogId}
          />
          {commentData.length > 0 && (
            <CommentBody
              commentData={commentData}
              userPhotoURL={userPhotoURL}
              showModalHandler={setShowModal}
              setCommentData={setCommentData}
              reportStatusHandler={reportStatusHandler}
              blogId={blogId}
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
        createStatus={reportStatus}
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
