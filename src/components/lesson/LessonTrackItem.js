import React, { useState, useContext } from 'react'
import styles from './LessonTrackItem.module.scss'
import { Collapse } from 'react-bootstrap'
import { LessonContext } from '../../context/LessonContext'

const LessonTrackItem = ({ episodes }) => {
  const { chosenLesson, active, playVideo, isEpisodeChosen, chooseEpisode } =
    useContext(LessonContext)

  return episodes.length === 0 ? (
    <p className={styles.noResult}>Chưa có bài học nào.</p>
  ) : (
    episodes.map((episode, index) => (
      <div key={episode._id}>
        <div
          className={styles.wrapper}
          onClick={() => chooseEpisode(episode._id)}
        >
          <h4 className={styles.episodeTitle}>{`${index + 1}. ${
            episode.title
          }`}</h4>
          <span className={styles.description}>2/2 | 22:09</span>
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
            {episode.lessons.map((lesson, index) => (
              <div
                className={
                  chosenLesson === lesson._id
                    ? `${styles.lessonItem} ${styles.active}`
                    : `${styles.lessonItem} ${styles.locked}`
                }
                key={lesson._id}
                onClick={() => playVideo(index, lesson.videoId)}
              >
                <div className={styles.lessonInfo}>
                  <h5 className={styles.lessonTitle}>{`${index + 1}. ${
                    lesson.title
                  }`}</h5>
                  <p>
                    <i
                      className={
                        chosenLesson !== lesson._id
                          ? 'fa-solid fa-circle-play'
                          : `fa-solid fa-compact-disc ${styles.playingIcon}`
                      }
                    ></i>{' '}
                    {lesson.time}
                  </p>
                </div>
                <div
                  className={
                    lesson.learned
                      ? styles.statusIcon
                      : `${styles.statusIcon} ${styles.locked}`
                  }
                >
                  {lesson.learned && (
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ fontSize: 12 }}
                    ></i>
                  )}
                  {!lesson.learned && active !== index && (
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
