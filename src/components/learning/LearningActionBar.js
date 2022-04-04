import React from 'react'
import styles from './LearningActionBar.module.scss'

const LearningActionBar = ({ show, showHandler }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>
        <i className="fa-solid fa-chevron-left"></i>
        <span>BÀI TRƯỚC</span>
      </button>
      <button
        className={`${styles.button} ${styles.primary} ${styles.disabled}`}
      >
        <span>BÀI TIẾP THEO</span>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      <div className={styles.toggleTrackMenu} onClick={showHandler}>
        <h3 className={styles.title}>1. Khái niệm kỹ thuật cần biết</h3>
        <button className={styles.toggleButton}>
          {!show && <i className="fa-solid fa-bars"></i>}
          {show && <i className="fa-solid fa-arrow-right"></i>}
        </button>
      </div>
    </div>
  )
}

export default LearningActionBar
