import React, { useContext } from 'react'
import styles from './PublishButton.module.scss'
import MainButton from '../../utils/button/MainButton'
import { PostContext } from '../../context/PostContext'

const PublishButton = ({ submitEditPost }) => {
  const { isValid, isNewPost, text, setShowModal } = useContext(PostContext)

  const saveNewOrEditPost = () => {
    if (isValid) isNewPost ? setShowModal(true) : submitEditPost()
  }

  return (
    <MainButton
      primary={true}
      className={
        isValid ? styles.button : `${styles.disabled} ${styles.button}`
      }
      onClick={saveNewOrEditPost}
    >
      {text}
    </MainButton>
  )
}

export default PublishButton
