import styles from './ModalError.module.scss'
import MainModal from '../../utils/main-modal/MainModal'
import MainButton from '../../utils/button/MainButton'
import { useContext } from 'react'
import { ErrorContext } from '../../../context/ErrorContext'

const ModalError = () => {
  const { show, onHideError } = useContext(ErrorContext)

  return (
    <MainModal centered={true} show={show} onHide={onHideError}>
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
