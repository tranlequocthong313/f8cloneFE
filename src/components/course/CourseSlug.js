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
import MainButton from '../utils/button/MainButton'

const Footer = React.lazy(() => import('../main-layout/footer/Footer'))

const CourseSlug = () => {
  const location = useLocation()

  const [course, setCourse] = useState(null)
  const [isShowVideoPreviewCourse, setIsShowVideoPreviewCourse] =
    useState(false)

  const showVideoPreviewCourse = () =>
    setIsShowVideoPreviewCourse((prev) => !prev)

  useEffect(() => {
    ;(async () => {
      const url = `${apiURL}${location.pathname}`
      const data = await getCourseBySlug(url)

      setCourse(data)
      document.title = `${data.title} | by F8`
    })()
  }, [location.pathname])

  const getCourseBySlug = async (url) => {
    try {
      return (await fetch(url)).json()
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
          <Row className={styles.wrapper}>
            <Col lg={12} xl={8}>
              <div className={styles.topHeading}>
                <h3>{course ? course.title : ''}</h3>
                <p>{course ? course.description : ''}</p>
              </div>
              <div className={styles.purchaseBadge}>
                <h5>Miễn phí</h5>
                <Link to={`/learning/${course ? course._id : ''}`}>
                  <MainButton className={styles.button} primary={true}>
                    Đăng ký học
                  </MainButton>
                </Link>
                <ul>
                  <li>
                    <i className={`${styles.icon} fa-solid fa-compass`}></i>
                    <span>Trình độ {course ? course.level : ''}</span>
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
                    <i className={`${styles.icon} fa-solid fa-clock`}></i>
                    <span>Học mọi lúc, mọi nơi</span>
                  </li>
                </ul>
              </div>
              <CourseDetail
                topicList={course ? course.goals : []}
                title={'Bạn sẽ học được gì?'}
              />
              {/* <CurriculumOfCourse
                  episodeList={course ? course.episode : []}
                /> */}
              {course && course.requirement.length > 0 && (
                <CourseDetail
                  topicList={course ? course.requirement : []}
                  title={'Yêu cầu'}
                />
              )}
            </Col>
            <Col lg={12} xl={4}>
              <CourseEnroll
                image={course ? course.image : ''}
                show={showVideoPreviewCourse}
                slug={course ? course._id : ''}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <div className={styles.mobileButtonWrapper}>
        <Link to={`/learning/${course ? course._id : ''}`}>
          <MainButton className={styles.mobileButton} primary={true}>
            ĐĂNG KÝ MIỄN PHÍ
          </MainButton>
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
      {isShowVideoPreviewCourse && (
        <PreviewCourse
          isShowVideoPreviewCourse={isShowVideoPreviewCourse}
          showVideoPreviewCourse={showVideoPreviewCourse}
        />
      )}
    </>
  )
}

export default CourseSlug
