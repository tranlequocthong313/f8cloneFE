import React from 'react'
import styles from './ProfileCourses.module.scss'
import { Link } from 'react-router-dom'

const CoursesEnrolled = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Các khóa học đã tham gia</h4>
      {!user.courseEnrolled && (
        <p className={styles.noResult}>Chưa có khóa học nào được đăng ký</p>
      )}
      {/* <div className={styles.course}>
        <Link to="/" className={styles.image}>
          <img
            alt=""
            src={
              'https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c0beb8.png'
            }
          />
        </Link>
        <div className={styles.info}>
          <h3 className={styles.title}>
            <Link to="/">HTML, CSS</Link>
          </h3>
          <p className={styles.description}>
            Khóa học HTML, CSS cơ bản cho người mới bắt đầu
          </p>
        </div>
      </div> */}
    </div>
  )
}

export default CoursesEnrolled
