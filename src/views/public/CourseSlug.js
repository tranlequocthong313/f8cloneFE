import React, { useEffect, useState, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Header from '../../components/layout/nav/Header'
import SideBar from '../../components/layout/sidebar/SideBar'
import CourseDetail from '../../components/course/CourseDetail'
import CourseEnroll from '../../components/course/CourseEnroll'
import styles from './CourseSlug.module.scss'
import PreviewCourse from '../../components/course/PreviewCourse'
import { apiURL } from '../../context/constants'
import MainButton from '../../components/utils/button/MainButton'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { enrollCourse as enroll } from '../../actions/userAction'
import SubLoading from '../../components/utils/loading/SubLoading'
import consoleLog from '../../components/utils/console-log/consoleLog'

const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const CourseSlug = () => {
  const dispatch = useDispatch()
  const location = useLocation()
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
    if (!token) return location('/login')

    const url = `${apiURL}/me/enroll-course/${course._id}`
    const data = await putEnrollCourse(url, token)

    dispatch(enroll({ coursesEnrolled: data.coursesEnrolled }))
    if (data.success) location(`/lesson/${course._id}`)
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
    <SubLoading />
  ) : (
    <>
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
        <CourseDetail topicList={course.goals} title={'Bạn sẽ học được gì?'} />
        {/* <CurriculumOfCourse
                  episodeList={ course.episode }
                /> */}
        {course && course.requirement.length > 0 && (
          <CourseDetail topicList={course.requirement} title={'Yêu cầu'} />
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
