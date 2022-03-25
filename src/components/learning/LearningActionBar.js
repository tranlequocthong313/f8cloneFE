import React from 'react'
import styles from './LearningActionBar.module.scss'

const LearningActionBar = ({ show, showHandler }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>
        <i className="bi bi-chevron-left"></i>
        <span>BÀI TRƯỚC</span>
      </button>
      <button
        className={`${styles.button} ${styles.primary} ${styles.disabled}`}
      >
        <span>BÀI TIẾP THEO</span>
        <i className="bi bi-chevron-right"></i>
      </button>
      <div className={styles.toggleTrackMenu} onClick={showHandler}>
        <h3 className={styles.title}>1. Khái niệm kỹ thuật cần biết</h3>
        <button className={styles.toggleButton}>
          {!show && <i className="bi bi-list"></i>}
          {show && <i className="bi bi-arrow-right"></i>}
        </button>
      </div>
    </div>
  )
}

export default LearningActionBar
