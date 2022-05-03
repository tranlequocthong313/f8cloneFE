import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import styles from './MyCourse.module.scss'
import Tippy from '../../../utils/tippy/Tippy'
import { apiURL } from '../../../../context/constants'
import Cookies from 'js-cookie'

const MyCourse = () => {
  const location = useLocation()

  const [myCourse, setMyCourse] = useState([])

  const getMyCourse = async () => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/me/courses`
    const data = await getCourse(url, token)

    setMyCourse(data.coursesEnrolled)
  }

  const getCourse = async (url, token) => {
    try {
      return (
        await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return (
    <>
      <Tippy
        button={
          <span
            className={
              location.pathname !== '/my-course'
                ? styles.userCourse
                : `${styles.userCourse} ${styles.primary}`
            }
            onClick={getMyCourse}
          >
            Khóa học của tôi
          </span>
        }
        className={styles.wrapper}
      >
        <header className={styles.header}>
          <h5>Khóa học của tôi</h5>
          <Link to="/my-course" className={styles.viewAll}>
            Xem tất cả
          </Link>
        </header>
        {myCourse.length === 0 && (
          <p className={styles.noResult}>Bạn chưa tham gia khóa học nào.</p>
        )}
        {myCourse.length > 0 &&
          myCourse.map((course) => (
            <div className={styles.body} key={course._id}>
              <Link to={`/lesson/${course._id}`}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${course.image})` }}
                ></div>
              </Link>
              <div className={styles.info}>
                <h3>
                  <Link to={`/lesson/${course._id}`}>{course.title}</Link>
                </h3>
                <p>Bạn chưa học khóa này</p>
                <Link
                  to={`/lesson/${course._id}`}
                  className={styles.startButton}
                >
                  Bắt đầu học
                </Link>
              </div>
            </div>
          ))}
      </Tippy>
    </>
  )
}

export default MyCourse
