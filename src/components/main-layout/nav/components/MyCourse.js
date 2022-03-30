import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import styles from './MyCourse.module.scss'
// import BackDrop from '../../../utils/backdrop/BackDrop'

const MyCourse = () => {
  const [show, setShow] = useState(false)

  const showHandler = () => setShow(prev => !prev)

  return (
    <>
      {/* <BackDrop onClick={showHandler} show={show} /> */}
      <span className={styles.userCourse} onClick={showHandler}>
        Khóa học của tôi
        {show && (
          <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
            <header className={styles.header}>
              <h6>Khóa học của tôi</h6>
              <Link
                to="/my-course"
                className={styles.viewAll}
                onClick={showHandler}
              >
                Xem tất cả
              </Link>
            </header>
            <div className={styles.body}>
              <Link
                to="/my-course"
                className={styles.thumb}
                onClick={showHandler}
              >
                <Image src="https://files.fullstack.edu.vn/f8-prod/courses/7.png" />
              </Link>
              <div className={styles.info}>
                <h3>
                  <Link to="/my-course" onClick={showHandler}>
                    Kiến Thức Nhập Môn IT
                  </Link>
                </h3>
                <p>Bạn chưa học khóa này</p>
                <Link to="/my-course" onClick={showHandler}>
                  Bắt đầu học
                </Link>
              </div>
            </div>
          </div>
        )}
      </span>
    </>
  )
}

export default MyCourse
