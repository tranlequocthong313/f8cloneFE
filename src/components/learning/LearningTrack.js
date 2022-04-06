import React from 'react'
import styles from './LearningTrack.module.scss'
import LearningTrackItem from './LearningTrackItem'

const LearningTrack = ({ showHandler, episodes, onComputer }) => {
  return (
    <>
      {onComputer && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <header className={styles.heading}>
              <h4>Nội dung khóa học</h4>
              <button className={styles.closeButton} onClick={showHandler}>
                <i className="bi bi-x-lg"></i>
              </button>
            </header>
            <div className={styles.body}>
              <LearningTrackItem episodes={episodes} />
            </div>
          </div>
        </div>
      )}

      {!onComputer && (
        <div className={styles.container}>
          <div className={styles.body}>
            <LearningTrackItem episodes={episodes} />
          </div>
        </div>
      )}
    </>
  )
}

export default LearningTrack
