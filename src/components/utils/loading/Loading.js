import React from 'react'
import { Spinner } from 'react-bootstrap'
import styles from './Loading.module.scss'
import f8Logo from '../../../asset/images/f8_icon.png'

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <img alt="F8 logo" src={f8Logo} />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  )
}

export default Loading
