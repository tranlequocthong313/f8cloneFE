import React, { useContext } from 'react'
import styles from './PublishButton.module.scss'
import MainButton from '../utils/button/MainButton'
import { BlogContext } from '../../context/BlogContext'

const PublishButton = ({ blogData }) => {
  const { isValid, isNewBlog, isEditBlog, text, setShowModal } =
    useContext(BlogContext)

  return (
    <MainButton
      primary={true}
      className={
        isValid ? styles.button : `${styles.disabled} ${styles.button}`
      }
      onClick={
        isValid && isNewBlog
          ? () => {
              blogData()
              setShowModal(true)
            }
          : isValid && isEditBlog
          ? () => blogData()
          : null
      }
    >
      {text}
    </MainButton>
  )
}

export default PublishButton
