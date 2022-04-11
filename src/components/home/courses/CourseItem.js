import React from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../../utils/button/MainButton'
import CardButton from '../../utils/card/CardButton'
import MainCard from '../../utils/card/MainCard'
import VerticalProgressBar from '../../utils/vertical-progress-bar/VerticalProgressBar'
import styles from './CourseItem.module.scss'

const CourseItem = ({ course, path }) => {
  // Format student count
  const formatNumber = (number) => {
    return new Intl.NumberFormat(['ban', 'id']).format(+number)
  }

  return (
    <MainCard>
      <Link to={`/courses/${course.slug}`}>
        <section
          title={course.title ? course.title : null}
          style={{ backgroundImage: `url(${course.image})` }}
        >
          <MainButton className={styles.button}>Xem khóa học</MainButton>
        </section>
      </Link>
      <h4 className={styles.title}>
        <Link to={`/courses/${course.slug}`}>{course.title}</Link>
      </h4>
      {!path && (
        <div className={styles.studentCount}>
          <i className="fa-solid fa-users"></i>
          <span>{formatNumber(course.studentCount)}</span>
        </div>
      )}
      {path && (
        <div className={styles.progress}>
          <p>Học cách đây 23 ngày trước</p>
          <VerticalProgressBar tooltip={'50%'} />
        </div>
      )}
    </MainCard>
  )
}

export default CourseItem
