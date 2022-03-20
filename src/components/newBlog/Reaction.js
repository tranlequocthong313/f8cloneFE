import React from 'react'
import styles from './Reaction.module.scss'

const Reaction = ({ like, comment }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.reactButton}>
        <i className="bi bi-heart"></i>
        <span>{like}</span>
      </div>
      <div className={styles.reactButton}>
        <i className="bi bi-chat"></i>
        <span>{comment}</span>
      </div>
    </div>
  )
}

export default Reaction
