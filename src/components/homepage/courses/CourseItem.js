import React from 'react'
import { Link } from 'react-router-dom'
import CardButton from '../../utils/card/CardButton'
import MainCard from '../../utils/card/MainCard'
import VerticalProgressBar from '../../utils/vertical-progress-bar/VerticalProgressBar'
import styles from './CourseItem.module.scss'

const CourseItem = ({ course, location }) => {
  const formatNumber = number => {
    return new Intl.NumberFormat(['ban', 'id']).format(+number)
  }

  return (
    <MainCard>
      <Link to={`/courses/${course.slug}`}>
        <section
          title={course.title ? course.title : null}
          style={{ backgroundImage: `url(${course.image})` }}
        >
          <CardButton>Xem khóa học</CardButton>
        </section>
      </Link>
      <h3 className={styles.title}>
        <Link to={`/courses/${course.slug}`}>{course.title}</Link>
      </h3>
      {location !== 'my-course' && (
        <div className={styles.studentCount}>
          <i className="bi bi-people-fill"></i>
          <span>{formatNumber(course.studentCount)}</span>
        </div>
      )}
      {location === 'my-course' && (
        <div className={styles.progress}>
          <p>Học cách đây 23 ngày trước</p>
          <VerticalProgressBar tooltip={'50%'} />
        </div>
      )}
    </MainCard>
  )
}

export default CourseItem
