import React from 'react'
import Youtube from 'react-youtube'
import styles from './VideoPlayer.module.scss'

const VideoPlayer = ({ videoId, onClick, page }) => {
  const youtubeVideoOptions = {
    playerVars: {
      autoplay: 1,
    },
  }

  return (
    <div className={styles.wrapper}>
      <Youtube videoId={videoId} opts={youtubeVideoOptions} />
    </div>
  )
}

export default VideoPlayer
