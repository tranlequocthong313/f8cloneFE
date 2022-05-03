import React, { useEffect, useState, Suspense } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Header from '../main-layout/nav/Header'
import SideBar from '../main-layout/sidebar/SideBar'
import CourseDetail from './CourseDetail'
import CourseEnroll from './CourseEnroll'
import styles from './CourseSlug.module.scss'
import PreviewCourse from './PreviewCourse'
import { apiURL } from '../../context/constants'
import MainButton from '../utils/button/MainButton'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { enrollCourse as enroll } from '../../actions/userAction'
import Loading from '../utils/loading/Loading'
import consoleLog from '../utils/console-log/consoleLog'

const Footer = React.lazy(() => import('../main-layout/footer/Footer'))

const CourseSlug = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const user = useSelector((state) => state.user)

  const [course, setCourse] = useState(null)
  const [isShowVideoPreviewCourse, setIsShowVideoPreviewCourse] =
    useState(false)
  const [loading, setLoading] = useState(true)

  const showVideoPreviewCourse = () =>
    setIsShowVideoPreviewCourse((prev) => !prev)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}${location.pathname}`
      const data = await getCourseBySlug(url)

      if (data) {
        setCourse(data)
        document.title = `${data.title} | by F8`
        setLoading(false)
      }
    })()
  }, [location.pathname])

  const getCourseBySlug = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const enrollCourse = async () => {
    const token = Cookies.get('token')
    if (!token) return history.push('/login')

    const url = `${apiURL}/me/enroll-course/${course._id}`
    const data = await putEnrollCourse(url, token)

    dispatch(enroll({ coursesEnrolled: data.coursesEnrolled }))
    if (data.success) history.push(`/lesson/${course._id}`)
  }

  const putEnrollCourse = async (url, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PUT',
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

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <Row className={styles.wrapper}>
            <Col lg={12} xl={8}>
              <div className={styles.topHeading}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
              <div className={styles.purchaseBadge}>
                <h5>Miễn phí</h5>
                <MainButton
                  className={styles.button}
                  primary={true}
                  onClick={enrollCourse}
                >
                  {!user.coursesEnrolled.includes(course._id)
                    ? 'ĐĂNG KÝ HỌC'
                    : 'TIẾP TỤC HỌC'}
                </MainButton>
                <ul>
                  <li>
                    <i className={`${styles.icon} fa-solid fa-compass`}></i>
                    <span>Trình độ {course.level}</span>
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
                topicList={course.goals}
                title={'Bạn sẽ học được gì?'}
              />
              {/* <CurriculumOfCourse
                  episodeList={ course.episode }
                /> */}
              {course && course.requirement.length > 0 && (
                <CourseDetail
                  topicList={course.requirement}
                  title={'Yêu cầu'}
                />
              )}
            </Col>
            <Col lg={12} xl={4}>
              <CourseEnroll
                image={course.image}
                show={showVideoPreviewCourse}
                enrollCourse={() => enrollCourse()}
                userCoursesEnrolled={user.coursesEnrolled}
                courseId={course._id}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <div className={styles.mobileButtonWrapper}>
        <MainButton
          className={styles.mobileButton}
          primary={true}
          onClick={enrollCourse}
        >
          {!user.coursesEnrolled.includes(course._id)
            ? 'ĐĂNG KÝ MIỄN PHÍ'
            : 'TIẾP TỤC HỌC'}
        </MainButton>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
      {isShowVideoPreviewCourse && (
        <PreviewCourse
          isShowVideoPreviewCourse={isShowVideoPreviewCourse}
          showVideoPreviewCourse={showVideoPreviewCourse}
          previewVideo={course.videoId}
        />
      )}
    </>
  )
}

export default CourseSlug
