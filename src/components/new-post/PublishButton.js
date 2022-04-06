import React from 'react'
import styles from './PublishButton.module.scss'
import MainButton from '../utils/button/MainButton'

const PublishButton = ({ blogDataHandler, setShowModal, isValid }) => {
  return (
    <MainButton
      primary={true}
      className={
        isValid ? styles.button : `${styles.disabled} ${styles.button}`
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
      Xuất bản
    </MainButton>
  )
}

export default PublishButton
