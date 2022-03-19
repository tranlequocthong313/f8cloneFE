import React from 'react'
import styles from './BackDrop.module.scss'

const BackDrop = ({ children, onClick, show }) => {
  return (
    show && (
      <div className={styles.backDrop} onClick={onClick}>
        {children}
      </div>
    )
  )
}

export default BackDrop
