import React from 'react'
import styles from './CardButton.module.scss'

const CardButton = ({ children }) => {
  return <button className={styles.cardBtn}>{children}</button>
}

export default CardButton
