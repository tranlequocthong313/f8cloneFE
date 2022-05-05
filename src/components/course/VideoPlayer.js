import React, { useContext } from 'react'
import Youtube from 'react-youtube'
import { LessonContext } from '../../context/LessonContext'
import styles from './VideoPlayer.module.scss'

const VideoPlayer = ({ videoId }) => {
  const youtubeVideoOptions = {
    playerVars: {
      autoplay: 0,
    },
  }

  const onEnd = async () => {}

  return (
    <div className={styles.wrapper}>
      <Youtube videoId={videoId} opts={youtubeVideoOptions} onEnd={onEnd} />
    </div>
  )
}

export default VideoPlayer
