import { useState, useRef, useEffect } from 'react'
import styles from './Comment.module.scss'
import CommentHeader from './CommentHeader'
import CommentInput from './CommentInput'
import CommentBody from './CommentBody'
import { useSelector } from 'react-redux'
import ScrollToTop from '../scroll/ScrollToTop'
import { apiURL } from '../../../context/constants'
import ModalError from '../modal-error/ModalError'
import consoleLog from '../console-log/consoleLog'
import SubLoading from '../loading/SubLoading'

const Comment = ({ submitComment, commentInput, onInput, data }) => {
  const commentRef = useRef()
  const user = useSelector((state) => state.user)

  const [commentData, setCommentData] = useState([])
  const [showSubmit, setShowSubmit] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState()

  const SHOW_SCROLL_TO_TOP_OFFSET = 1000
  const scrollToTop = () =>
    commentRef.current.scrollTop >= SHOW_SCROLL_TO_TOP_OFFSET
      ? setVisible(true)
      : setVisible(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}/comment/${data._id}`
      const comments = await getCommentByDataId(url)

      setCommentData(comments)
      setLoading(false)
    })()
  }, [data._id])

  const getCommentByDataId = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return loading ? (
    <SubLoading />
  ) : (
    <>
      <div className={styles.container}>
        <div className={styles.content} ref={commentRef} onScroll={scrollToTop}>
          <CommentHeader commentCount={data.comments} />
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
              data={data}
              setCommentData={setCommentData}
            />
          )}
          {commentData.length > 0 && (
            <CommentBody
              commentData={commentData}
              setCommentData={setCommentData}
              dataId={data._id}
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
    </>
  )
}

export default Comment
