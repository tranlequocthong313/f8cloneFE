import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
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

const CourseSlug = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
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
    if (!token) return navigate('/login')

    if (isEnrolled(course._id)) return

    const url = `${apiURL}/me/enroll-course/${course._id}`
    const data = await putEnrollCourse(url, token)

    if (data.success) {
      dispatch(
        enroll({ coursesEnrolled: data.coursesEnrolled[0].coursesEnrolled })
      )
      navigate(`/lesson/${course._id}`)
    }
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

  const isEnrolled = (id) => user.coursesEnrolled.includes(id)

  return loading ? (
    <SubLoading />
  ) : (
    <>
      <Row className={styles.wrapper}>
        <Col lg={12} xl={8}>
          <div className={styles.topHeading}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
          <div className={styles.purchaseBadge}>
            <h5>Miễn phí</h5>
            <Link to={isEnrolled ? `/lesson/${course._id}` : '#'}>
              <MainButton
                className={styles.button}
                primary={true}
                onClick={enrollCourse}
              >
                {!isEnrolled(course._id) ? 'ĐĂNG KÝ HỌC' : 'TIẾP TỤC HỌC'}
              </MainButton>
            </Link>
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
            <CourseDetail topicList={course.requirement} title={'Yêu cầu'} />
          )}
        </Col>
        <Col lg={12} xl={4}>
          <CourseEnroll
            image={course.image}
            show={showVideoPreviewCourse}
            enrollCourse={() => enrollCourse()}
            isEnrolled={isEnrolled}
            courseId={course._id}
          />
        </Col>
      </Row>

      <div className={styles.mobileButtonWrapper}>
        <Link to={`/lesson/${course._id}`}>
          <MainButton className={styles.mobileButton} primary={true}>
            {isEnrolled(course._id) ? 'TIẾP TỤC HỌC' : 'ĐĂNG KÝ MIỄN PHÍ'}
          </MainButton>
        </Link>
      </div>

      {isShowVideoPreviewCourse && (
        <PreviewCourse
          previewVideo={course.previewVideo}
          showVideo={showVideoPreviewCourse}
        />
      )}
    </>
  )
}

export default CourseSlug
