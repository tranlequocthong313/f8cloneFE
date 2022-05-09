import styles from './ModalError.module.scss'
import MainModal from './MainModal'
import MainButton from '../button/MainButton'
import { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'

const ModalError = () => {
  const { showError, onHideError } = useContext(ModalContext)

  return (
    <MainModal centered={true} show={showError} onHide={onHideError}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className={styles.body}>
          <p>Đã có lỗi xảy ra, hãy thử lại :(</p>
        </div>
        <MainButton
          primary={true}
          className={styles.button}
          onClick={onHideError}
        >
          Thử lại
        </MainButton>
      </div>
    </MainModal>
  )
}

export default ModalError
