import { useState, useRef, useEffect } from 'react'
import styles from './Comment.module.scss'
import CommentHeader from './CommentHeader'
import CommentInput from './CommentInput'
import CommentBody from './CommentBody'
import { useSelector } from 'react-redux'
import MainToast from '../toast/MainToast'
import ScrollToTop from '../scroll/ScrollToTop'
import { apiURL } from '../../../context/constants'

const Comment = ({ submitComment, commentInput, onInput, blog }) => {
  const commentRef = useRef()
  const user = useSelector((state) => state.user)

  const [commentData, setCommentData] = useState([])
  const [showSubmit, setShowSubmit] = useState(false)
  const [showCode, setShowCode] = useState(false)
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

  useEffect(() => {
    ;(async () => {
      const url = `${apiURL}/comment/${blog._id}`
      const comments = await getCommentByBLogId(url)

      setCommentData(comments)
    })()
  }, [blog._id, commentData])

  const getCommentByBLogId = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content} ref={commentRef} onScroll={scrollToTop}>
          <CommentHeader commentCount={blog.comments} />
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
              blog={blog}
              setCommentData={setCommentData}
            />
          )}
          {commentData.length > 0 && (
            <CommentBody
              commentData={commentData}
              userPhotoURL={user.photoURL}
              setCommentData={setCommentData}
              blogId={blog._id}
              getCommentByBLogId={getCommentByBLogId}
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
