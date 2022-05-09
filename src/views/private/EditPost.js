import React, { useRef, useState, useEffect, Suspense, useContext } from 'react'
import styles from './EditPost.module.scss'
import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import '../../sass/_myIcon.scss'
import Header from '../../components/layout/nav/Header'
import '../../sass/_markdownEditor.scss'
import ContentEditable from '../../utils/input/ContentEditable'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import { PostContext } from '../../context/PostContext'
import Cookies from 'js-cookie'
import SubLoading from '../../utils/loading/SubLoading'
import { ModalContext } from '../../context/ModalContext'
import consoleLog from '../../utils/console-log/consoleLog'
import { SocketContext } from '../../context/SocketContext'
import { useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'

const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const EditPost = () => {
  const mdEditor = useRef(null)
  const titleRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  const { showModal, setIsValid } = useContext(PostContext)
  const { onShowError } = useContext(ModalContext)
  const { current } = useContext(SocketContext).socket
  const user = useSelector((state) => state.user)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const LIMIT_TITLE_LENGTH = '190'

  useEffect(() => {
    document.title = title

    title && content ? setIsValid(true) : setIsValid(false)
  }, [title, content, setIsValid])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const url = `${apiURL}/blog${location.pathname}`
      const data = await getPost(url)

      if (data) {
        setTitle(data.title)
        setContent(data.content)
        setLoading(false)
        titleRef.current.innerText = data.title
      }
    })()
  }, [location.pathname])

  const getPost = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const submitEditPost = async () => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/blog${location.pathname}`
    const data = await putEditPost(url, token)

    if (data.success) navigate(-1)

    if (current && !user.isAdmin) {
      current.emit('post', {
        sender: user,
        postId: data.blog._id,
        receiverId: process.env.REACT_APP_ADMIN_ID,
        post: data.blog,
        description: 'vừa chỉnh sửa bài viết và đang chờ được xét duyệt',
        notificationType: 'post',
        postType: 'blogs',
        createdAt: new Date(),
      })
    }
  }

  const putEditPost = async (url, token) => {
    try {
      return (
        await fetch(url, {
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
      ).json()
    } catch (error) {
      consoleLog(error.message)
      onShowError()
    }
  }

  return loading ? (
    <SubLoading />
  ) : (
    <>
      {!showModal && (
        <>
          <Header submitEditPost={submitEditPost} />
          <Row>
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
                className={styles['rc-md-editor']}
                onChange={({ text }) => setContent(text)}
                renderHTML={(text) => <ReactMarkdown children={text} />}
              />
            </div>
          </Row>
        </>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default EditPost
