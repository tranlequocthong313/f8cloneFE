import React from 'react'
import { Link } from 'react-router-dom'
import CardButton from '../../utils/card/CardButton'
import MainCard from '../../utils/card/MainCard'
import styles from './CourseItem.module.scss'

const CourseItem = props => {
  const { course } = props

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
      <div className={styles.studentCount}>
        <i className="bi bi-people-fill"></i>
        <span>{course.studentCount}</span>
      </div>
    </MainCard>
  )
}

export default CourseItem
