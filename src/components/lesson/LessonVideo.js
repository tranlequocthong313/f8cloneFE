import React, { useContext } from 'react'
import { LessonContext } from '../../context/LessonContext'
import VideoPlayer from '../course/VideoPlayer'
import styles from './LessonVideo.module.scss'

const LessonVideo = () => {
  const { show, videoId, setPlay } = useContext(LessonContext)

  return (
    <div
      className={
        show ? styles.wrapper : `${styles.wrapper} ${styles.fullWidth}`
      }
    >
      <VideoPlayer
        onClick={() => setPlay(true)}
        videoId={videoId ? videoId : ''}
      />
    </div>
  )
}

export default LessonVideo
