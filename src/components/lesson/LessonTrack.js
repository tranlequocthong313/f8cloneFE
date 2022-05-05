import styles from './LessonTrack.module.scss'
import LessonTrackItem from './LessonTrackItem'

const LessonTrack = ({ episodes, className }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <h4>{'Nội dung khóa học'}</h4>
        </header>
        <div className={styles.body}>
          <LessonTrackItem episodes={episodes} />
        </div>
      </div>
    </div>
  )
}

export default LessonTrack
