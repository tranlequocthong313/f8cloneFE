import CourseItem from './CourseItem'
import ScrollHorizontal from '../../../utils/scroll/ScrollHorizontal'
import MainCardAdd from '../../../utils/card/MainCardAdd'

const CourseList = ({ courses, path }) => {
  return (
    <ScrollHorizontal path={'courses'}>
      {courses.map((course) => (
        <CourseItem key={course._id} course={course} path={path} />
      ))}
      {path && <MainCardAdd path={path}>Thêm khóa học</MainCardAdd>}
    </ScrollHorizontal>
  )
}

export default CourseList
