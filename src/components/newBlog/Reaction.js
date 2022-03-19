import React from 'react'
import styles from './Reaction.module.scss'

const Reaction = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.reactButton}>
        <i className="bi bi-heart"></i>
        <span>12</span>
      </div>
      <div className={styles.reactButton}>
        <i className="bi bi-chat"></i>
        <span>0</span>
      </div>
    </div>
  )
}

export default Reaction
