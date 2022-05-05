import React, { useRef, useState, useEffect, Suspense, useContext } from 'react'
import styles from './NewPost.module.scss'
import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import '../../sass/_myIcon.scss'
import Header from '../../components/layout/nav/Header'
import '../../sass/_markdownEditor.scss'
import ContentEditable from '../../components/utils/content-editable/ContentEditable'
import PostOption from '../../components/new-post/PostOption'
import { PostContext } from '../../context/PostContext'

const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const NewPost = () => {
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  const { showModal, setIsValid } = useContext(PostContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const LIMIT_TITLE_LENGTH = '190'

  useEffect(() => {
    document.title = title ? title : 'Viết blog | F8'

    const hasTitleAndContent = title && content
    hasTitleAndContent ? setIsValid(true) : setIsValid(false)
  }, [title, content, setIsValid])

  return (
    <>
      {!showModal && (
        <>
          <div className={styles.wrapper}>
            <ContentEditable
              text={'Tiêu đề'}
              className={styles.contentEditable}
              maxLength={LIMIT_TITLE_LENGTH}
              ref={titleRef}
              onInput={(e) => {
                setTitle(e.target.innerText)
              }}
            />
            <Editor
              ref={contentRef}
              value={content}
              onChange={({ text }) => {
                setContent(text)
              }}
              renderHTML={(text) => <ReactMarkdown children={text} />}
            />
          </div>
        </>
      )}
      {showModal && (
        <PostOption
          blogContent={{
            title: titleRef.current.innerText,
            content: contentRef.current.getMdValue(),
          }}
        />
      )}
    </>
  )
}

export default NewPost
