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
  const userPhotoURL = useSelector(state => state.user.photoURL)
  const commentRef = useRef()

  const [showSubmit, setShowSubmit] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [reportStatus, setReportStatus] = useState({
    isSuccess: false,
    show: false,
  })

  const createStatus = (isSuccess, show) => {
    setReportStatus(prev => {
      return {
        ...prev,
        show,
        isSuccess,
      }
    })
  }

  const reportStatusHandler = status =>
    status ? createStatus(true, true) : createStatus(false, true)

  const [visible, setVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {showModal && (
        <CommentModal showModalHandler={() => setShowModal(false)} />
      )}
      <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
        <div className={styles.container}>
          <div className={styles.closeButton} onClick={setShowComment}>
            <i className="bi bi-x"></i>
          </div>
          <div className={styles.content} ref={commentRef}>
            <div className={styles.detailRow}>
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
          </div>
          {visible && <ScrollToTop scrollToTop={scrollToTop} />}
        </div>
        <MainToast
          createStatus={reportStatus}
          setCreateStatus={() =>
            setReportStatus(prev => {
              return {
                ...prev,
                show: false,
              }
            })
          }
          successText={'Đã gửi báo cáo tới quản trị viên'}
          failText={'Gửi báo cáo không thành công'}
        />
      </div>
    </>
  )
}

export default Comment
