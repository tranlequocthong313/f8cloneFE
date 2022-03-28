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
  setShowComment,
  submitComment,
  commentData,
  commentInput,
  onInput,
  setCommentData,
  blogId,
}) => {
  const userPhotoURL = useSelector(state => state.user.photoURL)

  const [showSubmit, setShowSubmit] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [reportStatus, setReportStatus] = useState({
    isSuccess: false,
    show: false,
  })

  const reportStatusHandler = status => {
    if (status) {
      setReportStatus(prev => {
        return {
          ...prev,
          show: true,
          isSuccess: true,
        }
      })
    } else {
      setReportStatus(prev => {
        return {
          ...prev,
          show: true,
          isSuccess: false,
        }
      })
    }
  }

  const commentRef = useRef()

  // useEffect(() => {
  //   const scrollHandler = () => {
  //     const scrollY = commentRef.current.
  //     console.log(scrollY)
  //   }

  //   window.addEventListener('scroll', scrollHandler)

  //   return () => {
  //     console.log('Cleaner running')
  //     window.removeEventListener('scroll', scrollHandler)
  //   }
  // })

  return (
    <>
      {showModal && (
        <CommentModal showModalHandler={() => setShowModal(false)} />
      )}
      <div
        className={styles.wrapper}
        onClick={e => e.stopPropagation()}
        ref={commentRef}
      >
        <div className={styles.container}>
          <div className={styles.closeButton} onClick={setShowComment}>
            <i className="bi bi-x"></i>
          </div>
          <div className={styles.content}>
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
                />
              )}
            </div>
          </div>
          <ScrollToTop />
        </div>
        <MainToast
          createStatus={reportStatus}
          setCreateStatus={setReportStatus}
          successText={'Đã gửi báo cáo tới quản trị viên'}
          failText={'Gửi báo cáo không thành công'}
        />
      </div>
    </>
  )
}

export default Comment
