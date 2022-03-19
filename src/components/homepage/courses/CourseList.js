import React from 'react'
import CourseItem from './CourseItem'
import ScrollHorizontal from '../../utils/scroll/ScrollHorizontal'

const CourseList = props => {
  const { courses } = props

  return (
    <ScrollHorizontal path={'courses'}>
      {courses.map(course => (
        <CourseItem key={course.id} course={course} />
      ))}
    </ScrollHorizontal>
  )
}

export default CourseList
