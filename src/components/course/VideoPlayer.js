import React, { useContext } from 'react'
import Youtube from 'react-youtube'
import { LearningContext } from '../../context/LearningContext'
import styles from './VideoPlayer.module.scss'

const VideoPlayer = ({ videoId, onClick, page }) => {
  const { play, onEnd } = useContext(LearningContext)

  const youtubeVideoOptions = {
    playerVars: {
      autoplay: 1,
    },
  }

  return (
    <div className={styles.wrapper}>
      {page !== 'course-slug' && (
        <>
          {play && (
            <Youtube
              videoId={videoId}
              opts={youtubeVideoOptions}
              onEnd={onEnd}
            />
          )}
          {!play && (
            <div className={styles.player} onClick={onClick}>
              <div className={styles.noVideo}>
                <div className={styles.playButton}>
                  <div className={styles.playIcon}></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {page === 'course-slug' && (
        <Youtube videoId={videoId} opts={youtubeVideoOptions} />
      )}
    </div>
  )
}

export default VideoPlayer
