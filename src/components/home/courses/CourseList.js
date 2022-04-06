import React from 'react'
import CourseItem from './CourseItem'
import ScrollHorizontal from '../../utils/scroll/ScrollHorizontal'
import MainCard from '../../utils/card/MainCard'
import { Link } from 'react-router-dom'
import styles from './CourseList.module.scss'
import MainButton from '../../utils/button/MainButton'

const CourseList = ({ courses, location }) => {
  return (
    <ScrollHorizontal path={'courses'}>
      {courses.map((course) => (
        <CourseItem key={course._id} course={course} location={location} />
      ))}
      {location === 'my-course' && (
        <MainCard className={styles.addCard}>
          <Link to="/courses">
            <i className="fa-solid fa-circle-plus"></i>
            <div className={styles.star}></div>
            <MainButton outline={true} className={styles.button}>
              Thêm khóa học
            </MainButton>
          </Link>
        </MainCard>
      )}
    </ScrollHorizontal>
  )
}

export default CourseList
