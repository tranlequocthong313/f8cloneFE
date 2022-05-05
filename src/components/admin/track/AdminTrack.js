import { useContext } from 'react'
import { Collapse } from 'react-bootstrap'
import { LessonContext } from '../../../context/LessonContext'
import styles from './AdminTrack.module.scss'

const AdminTrack = ({ episodes, className, heading }) => {
  const { isEpisodeChosen, chooseEpisode, chosenLesson, setChosenLesson } =
    useContext(LessonContext)

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <h4>{heading}</h4>
        </header>
        <div className={styles.body}>
          {episodes.length === 0 ? (
            <p className={styles.noResult}>Chưa có bài học nào.</p>
          ) : (
            episodes.map((episode, index) => (
              <div key={episode._id}>
                <div
                  className={styles.lessonWrapper}
                  onClick={() => chooseEpisode(episode._id)}
                >
                  <h4 className={styles.episodeTitle}>{`Chương ${index + 1}: ${
                    episode.title
                  }`}</h4>
                </div>
                <Collapse in={isEpisodeChosen(episode._id)}>
                  <div className={styles.panelBody}>
                    {episode.lessons.map((lesson, index) => (
                      <div
                        className={
                          chosenLesson === lesson._id
                            ? `${styles.lessonItem} ${styles.active}`
                            : styles.lessonItem
                        }
                        key={lesson._id}
                        onClick={() => setChosenLesson(lesson._id)}
                      >
                        <div className={styles.lessonInfo}>
                          <i className="fa-solid fa-circle-play"></i>
                          <h5 className={styles.lessonTitle}>{`Bài ${
                            index + 1
                          }: ${lesson.title}`}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminTrack
