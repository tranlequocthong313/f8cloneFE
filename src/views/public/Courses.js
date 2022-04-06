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

const Courses = () => {
  const [courseFE, setCourseFE] = useState([])
  const [courseBE, setCourseBE] = useState([])

  useEffect(() => {
    document.title = 'Danh sách các khóa học lập trình tại F8 | by F8'
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}/courses`, {
          signal: controller.signal,
        })
        const data = await res.json()
        console.log('🚀 ~ file: Courses.js ~ line 27 ~ Courses ~ data', data)

        setCourseFE(data.courseFE)
        setCourseBE(data.courseBE)
      } catch (error) {
        console.log(error.message)
      }
    })()

    return () => controller?.abort()
  }, [])

  return (
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
