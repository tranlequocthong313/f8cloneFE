import React, { useEffect, useState, Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Header from '../main-layout/nav/Header'
import SideBar from '../main-layout/sidebar/SideBar'
import CourseDetail from './CourseDetail'
import CourseEnroll from './CourseEnroll'
import styles from './CourseSlug.module.scss'
import CurriculumOfCourse from './CurriculumOfCourse'
import PreviewCourse from './PreviewCourse'
import { apiURL } from '../../context/constants'

const CourseSlug = () => {
  const Footer = React.lazy(() => import('../main-layout/footer/Footer'))

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
      const res = await fetch(`${apiURL}${location.pathname}`)
      const data = await res.json()

      if (data.require) {
        setHasRequire(true)
      }

      setCourse(data)
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
                  <Link
                    className={styles.learnNowButton}
                    to={`/learning/${course ? course.slug : ''}`}
                  >
                    Đăng ký học
                  </Link>
                  <ul>
                    <li>
                      <i className={`${styles.icon} bi bi-compass-fill`}></i>
                      <span>Trình độ {course ? course.level : ''}</span>
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
                  slug={course ? course.slug : ''}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className={styles.mobileRegisterBtn}>
        <button>ĐĂNG KÝ MIỄN PHÍ</button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
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
