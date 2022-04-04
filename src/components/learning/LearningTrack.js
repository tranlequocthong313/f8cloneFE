import React from 'react'
import styles from './LearningTrack.module.scss'
import LearningTrackItem from './LearningTrackItem'

const LearningTrack = ({ showHandler, episodes }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <header className={styles.heading}>
            <h1>Nội dung khóa học</h1>
            <button className={styles.closeButton} onClick={showHandler}>
              <i className="bi bi-x-lg"></i>
            </button>
          </header>
          <div className={styles.body}>
            <LearningTrackItem episodes={episodes} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LearningTrack
