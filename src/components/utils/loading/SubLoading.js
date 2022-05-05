import React from 'react'
import { Spinner } from 'react-bootstrap'
import styles from './SubLoading.module.scss'
import f8Logo from '../../../asset/images/f8_icon.png'

const SubLoading = () => {
  return (
    <div className={styles.wrapper}>
      <Spinner animation="border" />
    </div>
  )
}

export default SubLoading
