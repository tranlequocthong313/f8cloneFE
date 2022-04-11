import React from 'react'
import CourseItem from './CourseItem'
import ScrollHorizontal from '../../utils/scroll/ScrollHorizontal'
import MainCard from '../../utils/card/MainCard'
import { Link } from 'react-router-dom'
import styles from './CourseList.module.scss'
import MainButton from '../../utils/button/MainButton'
import MainCardAdd from '../../utils/card/MainCardAdd'
import { useSelector } from 'react-redux'

const CourseList = ({ courses, path }) => {
  const user = useSelector((state) => state.user)

  return (
    <ScrollHorizontal path={'courses'}>
      {courses.map((course) => (
        <CourseItem key={course._id} course={course} path={path} />
      ))}
      {user.isAdmin && !path && (
        <MainCardAdd path={'/admin/course'}>Thêm khóa học</MainCardAdd>
      )}
      {path && <MainCardAdd path={path}>Thêm khóa học</MainCardAdd>}
    </ScrollHorizontal>
  )
}

export default CourseList
