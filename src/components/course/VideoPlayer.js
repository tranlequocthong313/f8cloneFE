import React, { useContext } from 'react'
import Youtube from 'react-youtube'
import { LearningContext } from '../../context/LearningContext'
import styles from './VideoPlayer.module.scss'

const VideoPlayer = ({ videoId, onClick, page }) => {
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  }

  const LearningCtx = useContext(LearningContext)

  return (
    <div className={styles.wrapper}>
      {page !== 'course-slug' && (
        <>
          {LearningCtx.play && (
            <Youtube
              videoId={videoId || LearningCtx.videoId}
              opts={opts}
              onEnd={LearningCtx.onEndHandler}
            />
          )}
          {!LearningCtx.play && (
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
      {page === 'course-slug' && <Youtube videoId={videoId} opts={opts} />}
    </div>
  )
}

export default VideoPlayer
