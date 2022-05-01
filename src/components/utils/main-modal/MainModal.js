import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../../sass/_modal.scss'

const MainModal = ({
  show,
  onHide,
  className,
  centered,
  closeButton,
  children,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      className={className}
      centered={centered}
    >
      <Modal.Header
        closeButton={closeButton}
        style={{ border: 'none' }}
      ></Modal.Header>
      {children}
    </Modal>
  )
}

export default MainModal
