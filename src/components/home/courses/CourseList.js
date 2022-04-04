import React from 'react'
import CourseItem from './CourseItem'
import ScrollHorizontal from '../../utils/scroll/ScrollHorizontal'
import MainCard from '../../utils/card/MainCard'
import { Link } from 'react-router-dom'
import styles from './CourseList.module.scss'

const CourseList = ({ courses, location }) => {
  return (
    <ScrollHorizontal path={'courses'}>
      {courses.map(course => (
        <CourseItem key={course._id} course={course} location={location} />
      ))}
      {location === 'my-course' && (
        <MainCard className={styles.addCard}>
          <Link to="/courses">
            <i className="fa-solid fa-circle-plus"></i>
            <div className={styles.star}></div>
            <button>Thêm khóa học</button>
          </Link>
        </MainCard>
      )}
    </ScrollHorizontal>
  )
}

export default CourseList
