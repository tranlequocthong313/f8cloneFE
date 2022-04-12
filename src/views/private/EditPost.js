import React, { useRef, useState, useEffect, Suspense, useContext } from 'react'
import styles from './EditPost.module.scss'
import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import '../../sass/_myIcon.scss'
import Header from '../../components/main-layout/nav/Header'
import '../../sass/_markdownEditor.scss'
import ContentEditable from '../../components/utils/content-editable/ContentEditable'
import Modal from '../../components/new-post/Modal'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import { BlogContext } from '../../context/BlogContext'
import Cookies from 'js-cookie'
import MainToast from '../../components/utils/toast/MainToast'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer'),
)

const EditPost = () => {
  const mdEditor = useRef(null)
  const titleRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editStatus, setEditStatus] = useState({
    isSuccess: false,
    show: false,
  })

  const { showModal, setIsValid } = useContext(BlogContext)

  // maxLengthContentEditable library require maxLength is string
  const LIMIT_TITLE_LENGTH = '190'

  useEffect(() => {
    document.title = title

    // User has to enter title and content then the 'POST' button is active
    title && content ? setIsValid(true) : setIsValid(false)
  }, [title, content, setIsValid])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}/blog/${location.pathname}`)

        const data = await res.json()

        titleRef.current.innerText = data.blogSlug.title
        setTitle(data.blogSlug.title)
        setContent(data.blogSlug.content)

        document.title = data.blogSlug.title
      } catch (error) {
        console.log(error.message)
      }
    })()

    return () => controller?.abort()
  }, [location.pathname])

  const blogDataHandler = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) return

      const res = await fetch(`${apiURL}/blog/${location.pathname}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: titleRef.current.innerText,
          content: mdEditor.current.getMdValue(),
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (data.success) {
        navigate(-1)
        editStatusHandler(true, true)
      } else {
        editStatusHandler(false, false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editStatusHandler = (isSuccess, show) => {
    setEditStatus((prev) => {
      return {
        ...prev,
        isSuccess,
        show,
      }
    })
  }

  const editorChangeHandler = ({ html, text }) => {
    const newContent = text.replace(/\d/g, '')
    setContent(newContent)
  }

  return (
    <>
      {!showModal && (
        <>
          <Header blogDataHandler={blogDataHandler} />
          <div className={styles.wrapper}>
            <ContentEditable
              text={'Tiêu đề'}
              className={styles.contentEditable}
              onInput={(e) => setTitle(e.target.innerText)}
              maxLength={LIMIT_TITLE_LENGTH}
              ref={titleRef}
            />
            <Editor
              ref={mdEditor}
              value={content}
              onChange={editorChangeHandler}
              renderHTML={(text) => <ReactMarkdown children={text} />}
            />
          </div>
        </>
      )}
      <MainToast
        status={editStatus}
        setStatus={() =>
          setEditStatus((prev) => {
            return {
              ...prev,
              show: false,
            }
          })
        }
        successText={'Chỉnh sửa bài viết thành công!'}
        failText={'Chỉnh sửa bài viêt không thành công!'}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default EditPost
