import React from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../utils/button/MainButton'
import styles from './CourseEnroll.module.scss'

const CourseEnroll = ({ image, show, slug, handleEnrollCourse }) => {
  return (
    <div className={styles.purchaseBadge}>
      <div className={styles.imgPreview} onClick={show}>
        <div
          className={styles.backgroundImg}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <i className={`${styles.icon} fa-solid fa-circle-play`}></i>
        <p>Xem giới thiệu khóa học</p>
      </div>
      <h5>Miễn phí</h5>
      <Link to={`/learning/${slug}`} onClick={handleEnrollCourse}>
        <MainButton className={styles.button} primary={true}>
          Đăng ký học
        </MainButton>
      </Link>
      <ul>
        <li>
          <i className={`${styles.icon} fa-solid fa-compass`}></i>
          <span>Trình độ cơ bản</span>
        </li>
        <li>
          <i className={`${styles.icon} fa-solid fa-film`} />
          <span>
            Tổng số <strong>10</strong> bài học
          </span>
        </li>
        <li>
          <i className={`${styles.icon} fa-solid fa-clock`}></i>
          <span>
            Thời lượng <strong>03 giờ 25 phút</strong>
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
