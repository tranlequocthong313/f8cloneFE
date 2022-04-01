import React, { useState, useEffect, Suspense } from 'react'
import Header from '../components/main-layout/nav/Header'
import SideBar from '../components/main-layout/sidebar/SideBar'
import { Col, Row } from 'react-bootstrap'
import { apiURL } from '../context/constants'
import CourseList from '../components/homepage/courses/CourseList'

const Footer = React.lazy(() =>
  import('../components/main-layout/footer/Footer')
)

const MyCourse = () => {
  const [courseFE, setCourseFE] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}`, {
          signal: controller.signal,
        })
        const data = await res.json()

        setCourseFE(data.courseFE)
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
            <div className="container">
              <div className="containerTop">
                <h1>Khóa học của tôi</h1>
                <p>Bạn chưa hoàn thành khóa học nào.</p>
              </div>
              <CourseList courses={courseFE} location={'my-course'} />
            </div>
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default MyCourse
