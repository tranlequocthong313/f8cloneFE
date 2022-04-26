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
import { PostContext } from '../../context/PostContext'
import Cookies from 'js-cookie'
import MainToast from '../../components/utils/toast/MainToast'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const EditPost = () => {
  const mdEditor = useRef(null)
  const titleRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()
  const { showModal, setIsValid } = useContext(PostContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editStatus, setEditStatus] = useState({
    isSuccess: false,
    show: false,
  })

  const LIMIT_TITLE_LENGTH = '190'

  useEffect(() => {
    document.title = title

    title && content ? setIsValid(true) : setIsValid(false)
  }, [title, content, setIsValid])

  console.log(location.pathname)

  useEffect(() => {
    ;(async () => {
      const url = `${apiURL}/blog${location.pathname}`
      const data = await getPost(url)

      setTitle(data.title)
      setContent(data.content)
      titleRef.current.innerText = data.title
    })()
  }, [location.pathname])

  const getPost = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  const setEditStatusTrue = () =>
    setEditStatus((prev) => {
      return {
        ...prev,
        isSuccess: true,
        show: true,
      }
    })

  const setEditStatusFalse = () =>
    setEditStatus((prev) => {
      return {
        ...prev,
        isSuccess: false,
        show: true,
      }
    })

  const submitEditPost = async () => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/blog${location.pathname}`
    const data = await putEditPost(url, token)

    if (data.success) {
      navigate(-1)
      setEditStatusTrue()
    } else {
      setEditStatusFalse()
    }
  }

  const putEditPost = async (url, token) => {
    try {
      return (await fetch(url),
      {
        method: 'PUT',
        body: JSON.stringify({
          title: titleRef.current.innerText,
          content: mdEditor.current.getMdValue(),
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      {!showModal && (
        <>
          <Header submitEditPost={submitEditPost} />
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
              onChange={({ text }) => setContent(text)}
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
