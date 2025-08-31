import React from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'
import styles from './MainToast.module.scss'

const MainToast = ({ status, setStatus, successText, failText }) => {
  return (
    <ToastContainer className="mt-5" position={'top-center'}>
      <Toast
        className={styles.toast}
        show={status.show}
        delay={2000}
        onClose={setStatus}
        autohide
      >
        <Toast.Body className={styles.toastBody}>
          {status.isSuccess ? successText : failText}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default MainToast
