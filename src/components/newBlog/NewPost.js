import React from 'react'
import styles from './NewPost.module.scss'

const NewPost = ({ blogDataHandler, setShowModal, isValid }) => {
  return (
    <div
      className={
        isValid ? styles.navAction : `${styles.disabled} ${styles.navAction}`
      }
      onClick={
        isValid
          ? () => {
              blogDataHandler()
              setShowModal(true)
            }
          : null
      }
    >
      <button>Xuất bản</button>
    </div>
  )
}

export default NewPost
