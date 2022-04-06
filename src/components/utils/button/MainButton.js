import React from 'react'
import styles from './MainButton.module.scss'

const MainButton = ({ onClick, primary, outline, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        primary
          ? `${styles.button} ${styles.primary}`
          : outline
          ? `${styles.button} ${styles.outline}`
          : styles.button
      } ${className}`}
    >
      {children}
    </button>
  )
}

export default MainButton
