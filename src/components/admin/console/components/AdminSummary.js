import React, { useRef, useState } from 'react'
import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import styles from './AdminSummary.module.scss'
import 'react-markdown-editor-lite/lib/index.css'
import '../../../../sass/_markdownEditor.scss'
import MainButton from '../../../utils/button/MainButton'

const AdminSummary = () => {
  const contentRef = useRef(null)

  const [content, setContent] = useState('')

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.heading}>
        <p>Nội dung</p>
      </div>

      <Editor
        ref={contentRef}
        value={content}
        onChange={({ text }) => {
          setContent(text)
        }}
        renderHTML={(text) => <ReactMarkdown children={text} />}
        className={styles['rc-md-editor']}
      />

      <MainButton primary={true} className={styles.submitButton}>
        Lưu lại
      </MainButton>
    </div>
  )
}

export default AdminSummary
