import React from 'react'
import { Collapse } from 'react-bootstrap'
import styles from './CourseCollapse.module.scss'
import { formatDuration } from '../../utils/format/index'

const CourseCollapse = ({ collapsedCurriculum, lessons, episodeId }) => {
  return (
    <Collapse in={collapsedCurriculum.includes(episodeId)}>
      <div className={styles.panelBody}>
        {lessons.map((lesson) => (
          <div className={styles.lessonItem} key={lesson._id}>
            <div className="d-flex align-items-center">
              <i className={`${styles.icon} fa-regular fa-circle-play`}></i>
              <div className={styles.lessonName}>{lesson.title}</div>
            </div>
            <span className={styles.duration}>
              {formatDuration(lesson.duration)}
            </span>
          </div>
        ))}
      </div>
    </Collapse>
  )
}

export default CourseCollapse
