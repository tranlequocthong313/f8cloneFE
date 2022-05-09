import { useContext } from 'react'
import styles from './LessonTrackItem.module.scss'
import { Collapse } from 'react-bootstrap'
import { LessonContext } from '../../context/LessonContext'
import { useSelector } from 'react-redux'
import { formatDuration } from '../../utils/format'

const LessonTrackItem = ({ episodes }) => {
  const {
    chosenLesson,
    active,
    playVideo,
    isEpisodeChosen,
    chooseEpisode,
    setTitleLesson,
    setEpisodeChosenTitle,
    setUpdatedAt,
    setLessonComments,
  } = useContext(LessonContext)
  const user = useSelector((state) => state.user)

  const renderIndexAndTitle = (index, title) => `${index}. ${title}`

  return episodes.length === 0 ? (
    <p className={styles.noResult}>Chưa có bài học nào.</p>
  ) : (
    episodes.map((episode, episodeIndex) => (
      <div key={episode._id}>
        <div
          className={styles.wrapper}
          onClick={() => chooseEpisode(episode._id)}
        >
          <h4 className={styles.episodeTitle}>
            {renderIndexAndTitle(episodeIndex + 1, episode.title)}
          </h4>
          <span className={styles.icon}>
            {isEpisodeChosen(episode._id) ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </span>
        </div>
        <Collapse in={isEpisodeChosen(episode._id)}>
          <div className={styles.panelBody}>
            {episode.lessons.map((lesson, lessonIndex) => (
              <div
                className={
                  chosenLesson === lesson._id
                    ? `${styles.lessonItem} ${styles.active}`
                    : styles.lessonItem
                }
                key={lesson._id}
                onClick={() => {
                  playVideo(lesson._id, lesson.videoId)
                  setTitleLesson(lesson.title)
                  setEpisodeChosenTitle(
                    renderIndexAndTitle(episodeIndex + 1, episode.title)
                  )
                  setUpdatedAt(lesson.updatedAt)
                  setLessonComments(lesson.comments)
                }}
              >
                <div className={styles.lessonInfo}>
                  <h5 className={styles.lessonTitle}>
                    {renderIndexAndTitle(lessonIndex + 1, lesson.title)}
                  </h5>
                  <p>
                    <i
                      className={
                        chosenLesson !== lesson._id
                          ? 'fa-solid fa-circle-play'
                          : `fa-solid fa-compact-disc ${styles.playingIcon}`
                      }
                    ></i>{' '}
                    {formatDuration(lesson.duration)}
                  </p>
                </div>
                <div
                  className={
                    user.lessonLearned.includes(lesson._id)
                      ? styles.statusIcon
                      : `${styles.statusIcon} ${styles.locked}`
                  }
                >
                  {user.lessonLearned.includes(lesson._id) && (
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ fontSize: 12 }}
                    ></i>
                  )}
                  {!user.lessonLearned.includes(lesson._id) &&
                    active !== lesson._id && (
                      <i className="fa-solid fa-clock-five"></i>
                    )}
                </div>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    ))
  )
}

export default LessonTrackItem
