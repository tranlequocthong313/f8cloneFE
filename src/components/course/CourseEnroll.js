import React from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../../utils/button/MainButton'
import styles from './CourseEnroll.module.scss'

const CourseEnroll = ({
  image,
  showVideoPreviewCourse,
  courseId,
  enrollCourse,
  isEnrolled,
  totalLesson,
  courseLevel,
}) => {
  return (
    <div className={styles.purchaseBadge}>
      <div className={styles.imgPreview} onClick={showVideoPreviewCourse}>
        <div
          className={styles.backgroundImg}
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
        <i className={`${styles.icon} fa-solid fa-circle-play`}></i>
        <p>Xem giới thiệu khóa học</p>
      </div>
      <h5>Miễn phí</h5>
      <Link to={isEnrolled ? `/lesson/${courseId}` : '#'}>
        <MainButton
          className={styles.button}
          primary={true}
          onClick={enrollCourse}
        >
          {!isEnrolled(courseId) ? 'ĐĂNG KÝ HỌC' : 'TIẾP TỤC HỌC'}
        </MainButton>
      </Link>
      <ul>
        <li>
          <i className={`${styles.icon} fa-solid fa-compass`}></i>
          <span>Trình độ {courseLevel}</span>
        </li>
        <li>
          <i className={`${styles.icon} fa-solid fa-film`} />
          <span>
            Tổng số <strong>{totalLesson.length}</strong> bài học
          </span>
        </li>
        <li>
          <i className={`${styles.icon} fa-solid fa-battery-full`}></i>
          <span>Học mọi lúc, mọi nơi</span>
        </li>
      </ul>
    </div>
  )
}

export default CourseEnroll
