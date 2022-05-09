import { Spinner } from 'react-bootstrap'
import styles from './SubLoading.module.scss'

const SubLoading = () => {
  return (
    <div className={styles.wrapper}>
      <Spinner animation="border" />
    </div>
  )
}

export default SubLoading
