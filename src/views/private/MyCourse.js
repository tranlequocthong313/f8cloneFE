import React, { useState, useEffect, Suspense } from 'react'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { Col, Row } from 'react-bootstrap'
import { apiURL } from '../../context/constants'
import CourseList from '../../components/home/courses/CourseList'
import MainCardAdd from '../../components/utils/card/MainCardAdd'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const MyCourse = () => {
  const [courseFE, setCourseFE] = useState([])

  useEffect(() => {
    document.title = 'Thiết lập về tôi tại F8'
  }, [])

  useEffect(() => {
    ;(async () => {
      const data = await getCourse(`${apiURL}`)
      setCourseFE(data.courseFE)
    })()
  }, [])

  const getCourse = async (url) => {
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
          <div className="withSidebarContent">
            <div className="container">
              <div className="containerTop">
                <h2>Khóa học của tôi</h2>
                <p>Bạn chưa hoàn thành khóa học nào.</p>
              </div>
              <CourseList courses={courseFE} path={'/courses'} />
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
