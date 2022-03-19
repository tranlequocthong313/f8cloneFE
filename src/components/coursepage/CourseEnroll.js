import React from 'react'
import styles from './CourseEnroll.module.scss'

const CourseEnroll = ({ image, showHandler }) => {
  return (
    <div className={styles.purchaseBadge}>
      <div className={styles.imgPreview} onClick={showHandler}>
        <div
          className={styles.backgroundImg}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <i className={`${styles.icon} bi bi-play-circle-fill`}></i>
        <p>Xem giới thiệu khóa học</p>
      </div>
      <h5>Miễn phí</h5>
      <button className={styles.learnNowButton}>Đăng ký học</button>
      <ul>
        <li>
          <i className={`${styles.icon} bi bi-compass-fill`}></i>
          <span>Trình độ cơ bản</span>
        </li>
        <li>
          <i className={`${styles.icon} bi bi-film`} />
          <span>
            Tổng số <strong>10</strong> bài học
          </span>
        </li>
        <li>
          <i className={`${styles.icon} bi bi-clock-fill`}></i>
          <span>
            Thời lượng <strong>03 giờ 25 phút</strong>
          </span>
        </li>
        <li>
          <i className={`${styles.icon} bi bi-battery-full`}></i>
          <span>Học mọi lúc, mọi nơi</span>
        </li>
      </ul>
    </div>
  )
}

export default CourseEnroll
