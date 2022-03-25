import React, { useState, useContext } from 'react'
import styles from './LearningTrackItem.module.scss'
import { Collapse } from 'react-bootstrap'
import { LearningContext } from '../../context/LearningContext'

const LearningTrackItem = ({ episodes }) => {
  const [open, setOpen] = useState([])

  const { active, activeHandler, playVideoHandler } =
    useContext(LearningContext)

  const openHandler = id =>
    setOpen(prev => {
      const isOpen = prev.includes(id)
      let newArray = []

      if (isOpen) {
        newArray = prev.filter(item => item !== id)
      } else {
        newArray = [...prev, id]
      }

      return newArray
    })

  //f9a4cf08-45b5-4ec6-8958-d6c62dd6da81
  //2f742497-e3aa-425c-99ec-373ce617c46c

  // Style lesson item
  const styleHandler = (learned, id) => {
    if (!learned && active !== id) {
      return `${styles.lessonItem} ${styles.locked}`
    } else if (active === id) {
      return `${styles.lessonItem} ${styles.active}`
    } else {
      return styles.lessonItem
    }
  }

  return episodes.map(episode => (
    <div key={episode.id}>
      <div className={styles.wrapper} onClick={() => openHandler(episode.id)}>
        <h3 className={styles.title}>{episode.title}</h3>
        <span className={styles.description}>2/2 | 22:09</span>
        <span className={styles.icon}>
          {/* <i className="bi bi-chevron-up"></i> */}
          <i className="bi bi-chevron-down"></i>
        </span>
      </div>
      <Collapse in={open.includes(episode.id)}>
        <div className={styles.panelBody}>
          {episode.lessons.map(lesson => (
            <div
              className={styleHandler(lesson.learned, lesson.id)}
              key={lesson.id}
              onClick={() => playVideoHandler(lesson.id, lesson.videoId)}
            >
              <div className={styles.lessonInfo}>
                <h3>{lesson.title}</h3>
                <p>
                  <i
                    className={
                      active !== lesson.id
                        ? 'bi bi-play-circle-fill'
                        : `bi-disc-fill ${styles.playingIcon}`
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
                {lesson.learned && <i className="bi bi-check-circle-fill"></i>}
                {!lesson.learned && active !== lesson.id && (
                  <i className="bi bi-lock-fill"></i>
                )}
              </div>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  ))
}

export default LearningTrackItem
