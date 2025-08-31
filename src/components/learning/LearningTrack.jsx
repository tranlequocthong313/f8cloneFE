import React from 'react'
import { Spinner } from 'react-bootstrap'
import styles from './LearningTrack.module.scss'
import LearningTrackItem from './LearningTrackItem'

const LearningTrack = ({ episodes, loading }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <h4>Nội dung khóa học</h4>
        </header>
        <div className={styles.body}>
          <LearningTrackItem episodes={episodes} />
        </div>
      </div>
    </div>
  )
}

export default LearningTrack
