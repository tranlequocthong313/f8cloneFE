import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { ModalContext } from '../../context/ModalContext'
import MainButton from '../button/MainButton'
import MainModal from './MainModal'
import styles from './ModalConfirm.module.scss'

const ModalConfirm = ({ onConfirm, header, body }) => {
  const { showConfirm, onHideConfirm } = useContext(ModalContext)

  return (
    <MainModal
      show={showConfirm}
      onHide={onHideConfirm}
      centered={true}
      className={styles.modalWrapper}
    >
      <h4>{header}</h4>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <div className={styles.buttonWrapper}>
        <MainButton onClick={onConfirm}>Đồng ý</MainButton>
        <MainButton onClick={onHideConfirm}>Hủy</MainButton>
      </div>
    </MainModal>
  )
}

export default ModalConfirm
