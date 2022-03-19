import React from 'react'
import { Collapse } from 'react-bootstrap'
import styles from './CourseCollapse.module.scss'
import '../../sass/_float.scss'

const CourseCollapse = ({ open, openAll, lessons, episodeId }) => {
  return (
    <Collapse in={open.includes(episodeId)}>
      <div className={styles.panelBody}>
        {lessons.map(lesson => (
          <div className={styles.lessonItem} key={lesson.id}>
            <span className="floatLeft">
              <i className={`${styles.icon} bi bi-play-circle-fill`}></i>
              <div className={styles.lessonName}>{lesson.title}</div>
            </span>
            <span className={`${styles.time} floatRight`}>{lesson.time}</span>
          </div>
        ))}
      </div>
    </Collapse>
  )
}

export default CourseCollapse
