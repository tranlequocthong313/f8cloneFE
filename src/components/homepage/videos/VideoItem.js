import React from 'react'
import { Link } from 'react-router-dom'
import CardButton from '../../utils/card/CardButton'
import MainCard from '../../utils/card/MainCard'
import styles from './VideoItem.module.scss'

const VideoItem = props => {
  const { video } = props

  return (
    <MainCard>
      <a
        rel="noreferrer noopener noreferrer"
        target="_blank"
        href={`https://www.youtube.com/watch?v=${video.videoId}`}
      >
        <section
          title={video.title}
          style={{ backgroundImage: `url(${video.image})` }}
        >
          <CardButton>Xem video</CardButton>
          <div className={styles.videoInfo}>
            <div className={styles.playWrap}>
              <i className="bi bi-play-fill"></i>
            </div>
            <div className={styles.duration}>
              {video.duration.replace(/[^\d.-]/g, '')}
            </div>
            <div></div>
          </div>
        </section>
      </a>
      <h3 className={styles.title}>
        <a
          rel="noreferrer noopener noreferrer"
          target="_blank"
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
        >
          {video.title}
        </a>
      </h3>
      <ul className={styles.stats}>
        <li>
          <i className="bi bi-eye-fill"></i>
          <span>{video.viewCount}</span>
        </li>
        <li>
          <i className="bi bi-hand-thumbs-up-fill"></i>
          <span>{video.likeCount}</span>
        </li>
        <li>
          <i className="bi bi-chat-fill"></i>
          <span>{video.commentCount}</span>
        </li>
      </ul>
    </MainCard>
  )
}

export default VideoItem
