import React from 'react'
import styles from './VideoPlayer.module.scss'

const VideoPlayer = ({ previewVideo }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.player}>
        <iframe
          width="760"
          height="427"
          src={`https://www.youtube.com/embed/${previewVideo}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default VideoPlayer
