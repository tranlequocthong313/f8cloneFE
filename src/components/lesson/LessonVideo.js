import React, { useContext } from 'react'
import { LessonContext } from '../../context/LessonContext'
import VideoPlayer from '../course/VideoPlayer'
import styles from './LessonVideo.module.scss'

const LessonVideo = () => {
  const { videoId, onEnd, play } = useContext(LessonContext)

  return (
    <div
      className={
        videoId
          ? `${styles.wrapper} ${styles.fullWidth}`
          : `${styles.wrapper} ${styles.fullWidth} ${styles.disabled}`
      }
    >
      <VideoPlayer videoId={videoId} onEnd={onEnd} play={play} />
    </div>
  )
}

export default LessonVideo
