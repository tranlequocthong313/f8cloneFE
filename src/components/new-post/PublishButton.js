import React from 'react'
import styles from './PublishButton.module.scss'

const PublishButton = ({ blogDataHandler, setShowModal, isValid }) => {
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

export default PublishButton
