import React, { useEffect, useState, useContext, useMemo, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Header from '../main-layout/nav/Header'
import SideBar from '../main-layout/sidebar/SideBar'
import Footer from '../main-layout/footer/Footer'
import CourseDetail from './CourseDetail'
import CourseEnroll from './CourseEnroll'
import styles from './CourseSlug.module.scss'
import CurriculumOfCourse from './CurriculumOfCourse'
import PreviewCourse from './PreviewCourse'

const CourseSlug = () => {
  const location = useLocation()

  const [course, setCourse] = useState()
  const [hasRequire, setHasRequire] = useState(false)
  const [show, setShow] = useState(false)

  const showHandler = () => setShow(prev => !prev)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://f8clone.herokuapp.com${location.pathname}`
      )
      const data = await res.json()

      if (data.require) {
        setHasRequire(true)
      }

      setCourse(data)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <Row className={styles.wrapper}>
              <Col lg={12} xl={8}>
                <div className={styles.topHeading}>
                  <h1>{course ? course.title : ''}</h1>
                  <p>{course ? course.description : ''}</p>
                </div>
                <div className={styles.purchaseBadge}>
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
                <CourseDetail
                  topicList={course ? course.topicList : []}
                  title={'Bạn sẽ học được gì?'}
                />
                <CurriculumOfCourse
                  episodeList={course ? course.episode : []}
                />
                {hasRequire && (
                  <CourseDetail
                    topicList={course ? course.require : []}
                    title={'Yêu cầu'}
                  />
                )}
              </Col>
              <Col lg={12} xl={4}>
                <CourseEnroll
                  image={course ? course.image : ''}
                  showHandler={showHandler}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className={styles.mobileRegisterBtn}>
        <button>ĐĂNG KÝ MIỄN PHÍ</button>
      </div>
      <Footer />
      {show && (
        <PreviewCourse
          previewVideo={course.previewVideo}
          showHandler={showHandler}
        />
      )}
    </>
  )
}

export default CourseSlug
