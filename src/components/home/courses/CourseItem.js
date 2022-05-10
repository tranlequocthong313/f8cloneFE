import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MainButton from '../../../utils/button/MainButton'
import MainCard from '../../../utils/card/MainCard'
import styles from './CourseItem.module.scss'
import { formatNumber } from '../../../utils/format/index'

const CourseItem = ({ course }) => {
  const user = useSelector((state) => state.user)

  const isEnrolled = (id) => user.coursesEnrolled.includes(id)

  return (
    <MainCard>
      <Link
        to={
          !isEnrolled(course._id)
            ? `/courses/${course._id}`
            : `/lesson/${course._id}`
        }
      >
        <section
          title={course.title ? course.title : null}
          style={{
            backgroundImage: `url('${course.image}')`,
          }}
        >
          <MainButton className={styles.button}>Xem khóa học</MainButton>
        </section>
      </Link>
      <h4 className={styles.title}>
        <Link
          to={
            !isEnrolled(course._id)
              ? `/courses/${course._id}`
              : `/lesson/${course._id}`
          }
        >
          {course.title}
        </Link>
      </h4>
      <div className={styles.studentCount}>
        <i className="fa-solid fa-users"></i>
        <span>{formatNumber(course.studentCount)}</span>
      </div>
    </MainCard>
  )
}

export default CourseItem
