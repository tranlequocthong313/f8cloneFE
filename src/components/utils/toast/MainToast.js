import React from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'
import styles from './MainToast.module.scss'

const MainToast = ({
  createStatus,
  setCreateStatus,
  successText,
  failText,
}) => {
  return (
    <ToastContainer className="mt-5" position={'top-center'}>
      <Toast
        className={styles.toast}
        show={createStatus.show}
        delay={2000}
        onClose={setCreateStatus}
        autohide
      >
        <Toast.Body className={styles.toastBody}>
          {createStatus.isSuccess ? successText : failText}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default MainToast
