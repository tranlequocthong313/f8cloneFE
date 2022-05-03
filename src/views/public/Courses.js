import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import HeadingTitleWrap from '../../components/utils/title-heading/HeadingTitleWrap'
import CourseList from '../../components/home/courses/CourseList'
import ctaImage from '../../asset/images/fb-group-cards@2x.png'
import '../../sass/_mainHeadingTitle.scss'
import Suggestion from '../../components/utils/suggestion/Suggestion'
import '../../sass/_container.scss'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import Footer from '../../components/main-layout/footer/Footer'
import { apiURL } from '../../context/constants'
import styles from './Courses.module.scss'
import '../../sass/_withSidebarContent.scss'
import Loading from '../../components/utils/loading/Loading'
import consoleLog from '../../components/utils/console-log/consoleLog'

const Courses = () => {
  const [courseFE, setCourseFE] = useState([])
  const [courseBE, setCourseBE] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(
    () => (document.title = 'Danh sách các khóa học lập trình tại F8 | by F8'),
    []
  )

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}/courses`
      const data = await getCourses(url)

      if (data) {
        const courseFe = data.filter((course) => course.role === 'Front-end')
        const courseBe = data.filter((course) => course.role === 'Back-end')
        const courseFullstack = data.filter(
          (course) => course.role === 'Fullstack'
        )

        setCourseFE([...courseFullstack, ...courseFe])
        setCourseBE([...courseFullstack, ...courseBe])
        setLoading(false)
      }
    })()
  }, [])

  const getCourses = async (url) => {
    try {
      return (await fetch(url)).json()
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
          <div className="withSidebarContent">
            <Row className={styles.wrapper}>
              <div className={styles.containerTop}>
                <h2>Khóa học</h2>
                <p>
                  Các khóa học được thiết kế phù hợp cho cả người mới, miễn phí,
                  nội dung dễ hiểu.
                </p>
              </div>
              <HeadingTitleWrap
                title={'Lộ trình học Front-end'}
                viewMode={null}
              />
              <CourseList courses={courseFE} />

              <HeadingTitleWrap
                title={'Lộ trình học Back-end'}
                viewMode={null}
              />
              <CourseList courses={courseBE} />

              <Suggestion
                title={'Bạn đang tìm kiếm lộ trình học cho người mới?'}
                description={
                  'Các khóa học được thiết kế phù hợp cho người mới, lộ trình học rõ ràng, nội dung dễ hiểu.'
                }
                button={'Xem lộ trình'}
                image={ctaImage}
              />
            </Row>
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default Courses
