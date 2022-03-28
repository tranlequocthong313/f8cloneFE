import React from 'react'
import CardButton from '../../utils/card/CardButton'
import MainCard from '../../utils/card/MainCard'
import styles from './VideoItem.module.scss'
import youtubeDurationFormat from 'youtube-duration-format'

const VideoItem = ({ video }) => {
  const formatNumber = number => {
    return new Intl.NumberFormat(['ban', 'id']).format(number)
  }

  const formatDuration = duration => {
    const durationFormatted = youtubeDurationFormat(duration)
    return durationFormatted
  }

  return (
    <MainCard>
      <a
        rel="noopener noreferrer"
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
              {formatDuration(video.duration)}
            </div>
            <div></div>
          </div>
        </section>
      </a>
      <h3 className={styles.title}>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
        >
          {video.title}
        </a>
      </h3>
      <ul className={styles.stats}>
        <li>
          <i className="bi bi-eye-fill"></i>
          <span>{formatNumber(video.viewCount)}</span>
        </li>
        <li>
          <i className="bi bi-hand-thumbs-up-fill"></i>
          <span>{formatNumber(video.likeCount)}</span>
        </li>
        <li>
          <i className="bi bi-chat-fill"></i>
          <span>{formatNumber(video.commentCount)}</span>
        </li>
      </ul>
    </MainCard>
  )
}

export default VideoItem
