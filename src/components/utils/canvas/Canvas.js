import React from 'react'
import styles from './Canvas.module.scss'

const Canvas = ({ children, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

export default Canvas
