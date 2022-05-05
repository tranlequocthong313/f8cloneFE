import React, { useContext } from 'react'
import { LessonContext } from '../../context/LessonContext'
import VideoPlayer from '../course/VideoPlayer'
import styles from './LessonVideo.module.scss'

const LessonVideo = () => {
  const { show, videoId, playVideo } = useContext(LessonContext)

  return (
    <div
      className={
        show ? styles.wrapper : `${styles.wrapper} ${styles.fullWidth}`
      }
    >
      <VideoPlayer onClick={playVideo} videoId={videoId} />
    </div>
  )
}

export default LessonVideo
