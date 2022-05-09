import Youtube from 'react-youtube'
import styles from './VideoPlayer.module.scss'

const VideoPlayer = ({ play, videoId, onEnd }) => {
  const youtubeVideoOptions = {
    playerVars: {
      autoplay: play,
    },
  }

  return (
    <div className={styles.wrapper}>
      <Youtube videoId={videoId} opts={youtubeVideoOptions} onEnd={onEnd} />
    </div>
  )
}

export default VideoPlayer
