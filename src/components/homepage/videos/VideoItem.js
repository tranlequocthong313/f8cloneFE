import React from 'react'
import { Link } from 'react-router-dom'
import CardButton from '../../utils/card/CardButton'
import MainCard from '../../utils/card/MainCard'
import styles from './VideoItem.module.scss'

const VideoItem = props => {
  const { video } = props

  return (
    <MainCard>
      <Link to="/videos">
        <section
          title={video.title}
          style={{ backgroundImage: `url(${video.image})` }}
        >
          <CardButton>Xem video</CardButton>
          <div className={styles.videoInfo}>
            <div className={styles.playWrap}>
              <i className="bi bi-play-fill"></i>
            </div>
            <div className={styles.duration}>{video.time}</div>
            <div></div>
          </div>
        </section>
      </Link>
      <h3 className={styles.title}>
        <Link to="/">{video.title}</Link>
      </h3>
      <ul className={styles.stats}>
        <li>
          <i className="bi bi-eye-fill"></i>
          <span>{video.views}</span>
        </li>
        <li>
          <i className="bi bi-hand-thumbs-up-fill"></i>
          <span>{video.likes}</span>
        </li>
        <li>
          <i className="bi bi-chat-fill"></i>
          <span>{video.comments}</span>
        </li>
      </ul>
    </MainCard>
  )
}

export default VideoItem
