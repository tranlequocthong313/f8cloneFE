import React from 'react'
import styles from './LearningActionBar.module.scss'
import VerticalModal from '../utils/vertical-modal/VerticalModal'
import LearningTrack from './LearningTrack'

const LearningActionBar = ({ episodes, show, showHandler }) => {
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
        <h4 className={styles.title}>1. Khái niệm kỹ thuật cần biết</h4>
        <button className={styles.toggleButton}>
          {!show && <i className="fa-solid fa-bars"></i>}
          {show && <i className="fa-solid fa-arrow-right"></i>}
        </button>
      </div>
      <div className={styles.mobileLearningTrack}>
        <VerticalModal
          button={
            <div className={styles.toggleTrackMenu}>
              <h4 className={styles.title}>1. Khái niệm kỹ thuật cần biết</h4>
              <button className={styles.toggleButton}>
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          }
          closeButton={true}
          header={
            <h4 style={{ fontSize: 16, fontWeight: 600 }}>Nội dung khóa học</h4>
          }
          className={styles.modalWrapper}
        >
          <LearningTrack episodes={episodes} />
        </VerticalModal>
      </div>
    </div>
  )
}

export default LearningActionBar
