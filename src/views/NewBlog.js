import React, { useRef, useState, useEffect } from 'react'
import styles from './NewBlog.module.scss'
import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import '../sass/_myIcon.scss'
import Header from '../components/main-layout/nav/Header'
import Footer from '../components/main-layout/footer/Footer'
import '../sass/_custom.scss'
import BlogDetail from '../components/newBlog/BlogDetail'
import Sidebar from '../components/main-layout/sidebar/SideBar'
import { Row, Col } from 'react-bootstrap'
import BlogSameAuthor from '../components/newBlog/BlogSameAuthor'
import Reaction from '../components/newBlog/Reaction'
import ContentEditable from '../components/utils/content-editable/ContentEditable'
import Modal from '../components/newBlog/Modal'
import { v4 as uuidv4 } from 'uuid'
import { apiURL } from '../context/constants'

const NewBlog = () => {
  const mdEditor = useRef(null)
  const titleRef = useRef(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState()
  const [isValid, setIsValid] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState({
    id: '',
    title: '',
    content: '',
    titleDisplay: '',
    description: '',
    tags: [],
    allow: true,
    schedule: '',
    thumb: null,
  })

  const LIMIT_TITLE_LENGTH = 190

  useEffect(() => {
    // Set browser title = title
    document.title = title

    // User has to enter title and content then the 'POST' button is active
    if (content && title) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [content, title])

  const blogDataHandler = async detail => {
    console.log(detail)
    if (detail) {
      setData(prev => {
        return {
          ...prev,
          ...detail,
        }
      })

      try {
        const res = await fetch(`${apiURL}/new-blog`, {
          method: 'POST',
          body: JSON.stringify({ ...data }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const newData = await res.json()

        console.log(newData.message)
      } catch (error) {
        console.log(error.message)
      }
      return
    }

    if (
      mdEditor.current &&
      title.length > 0 &&
      title.length <= LIMIT_TITLE_LENGTH
    ) {
      const data = {
        id: uuidv4(),
        title: titleRef.current.innerText,
        content: mdEditor.current.getMdValue(),
      }

      titleRef.current.innerText = data.title

      setData(prev => {
        return {
          ...prev,
          ...data,
        }
      })
    }
  }

  const editorChangeHandler = ({ html, text }) => {
    const newContent = text.replace(/\d/g, '')
    setContent(newContent)
  }

  const checkTitleLengthHandler = e => {
    let length = e.target.innerText.trim().length
    const selection = window.getSelection()
    let hasSelection = false

    if (e.clipboardData) {
      setTitle(e.clipboardData.getData('Text').substring(0, LIMIT_TITLE_LENGTH))
    } else {
      setTitle(e.target.innerText)
    }

    if (selection) {
      hasSelection = !!selection.toString()
    }

    if (length >= LIMIT_TITLE_LENGTH && !hasSelection) {
      e.preventDefault()
      return false
    }
  }

  return (
    <>
      {!showModal && (
        <>
          <Header
            currentPage={'new-blog'}
            blogDataHandler={blogDataHandler}
            setShowModal={setShowModal}
            isValid={isValid}
          />
          <div className={styles.wrapper}>
            <ContentEditable
              value={data.title}
              text={'Tiêu đề'}
              className={styles.contentEditable}
              onKeyPress={checkTitleLengthHandler}
              onPaste={checkTitleLengthHandler}
              ref={titleRef}
            />
            <Editor
              ref={mdEditor}
              value={content}
              onChange={editorChangeHandler}
              renderHTML={text => <ReactMarkdown children={text} />}
            />
          </div>
        </>
      )}
      {showModal && (
        <Modal
          blogDataHandler={blogDataHandler}
          data={data}
          setData={setData}
          setShowModal={setShowModal}
        />
      )}
      <Footer />
    </>
  )
}

export default NewBlog
