import React, { useState, useEffect } from 'react'
import '../sass/_withSidebarContent.scss'
import { Col, Row } from 'react-bootstrap'
import HeadingTitleWrap from '../components/utils/title-heading/HeadingTitleWrap'
import CourseList from '../components/homepage/courses/CourseList'
import ctaImage from '../asset/fb-group-cards@2x.png'
import '../sass/_mainHeadingTitle.scss'
import Suggestion from '../components/utils/suggestion/Suggestion'
import '../sass/_container.scss'
import Header from '../components/main-layout/nav/Header'
import SideBar from '../components/main-layout/sidebar/SideBar'
import Footer from '../components/main-layout/footer/Footer'

const Courses = () => {
  const [courseData, setCourseData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async token => {
    try {
      const res = await fetch('https://f8clone.herokuapp.com/')
      const data = await res.json()

      setCourseData(data.COURSES_DUMMY_DATA)
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
            <div className="container">
              <div className={'containerTop'}>
                <h1>Khóa học</h1>
                <p>
                  Các khóa học được thiết kế phù hợp cho cả người mới, miễn phí,
                  nội dung dễ hiểu.
                </p>
              </div>

              <HeadingTitleWrap title={'Front-end'} viewMode={null} />
              <CourseList courses={courseData} />

              <HeadingTitleWrap title={'Back-end'} viewMode={null} />
              <CourseList courses={courseData} />

              <Suggestion
                title={'Bạn đang tìm kiếm lộ trình học cho người mới?'}
                description={
                  'Các khóa học được thiết kế phù hợp cho người mới, lộ trình học rõ ràng, nội dung dễ hiểu.'
                }
                button={'Xem lộ trình'}
                image={ctaImage}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default Courses
