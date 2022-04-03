import React, { useContext } from 'react'
import { LearningContext } from '../../context/LearningContext'
import VideoPlayer from '../course/VideoPlayer'
import styles from './LearningVideo.module.scss'

const LearningVideo = () => {
  const { show, videoId, setPlay } = useContext(LearningContext)

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

export default LearningVideo
