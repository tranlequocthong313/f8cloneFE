import React, { useState, useEffect, Suspense } from 'react'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { Col, Row } from 'react-bootstrap'
import { apiURL } from '../../context/constants'
import CourseList from '../../components/home/courses/CourseList'
import MainCardAdd from '../../components/utils/card/MainCardAdd'
import Cookies from 'js-cookie'
import Loading from '../../components/utils/loading/Loading'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const MyCourse = () => {
  const [myCourse, setMyCourse] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const token = Cookies.get('token')
      if (!token) return

      const url = `${apiURL}/me/courses`
      const data = await getCourse(url, token)

      if (data) {
        setMyCourse(data.coursesEnrolled)
        setLoading(false)
      }
    })()
  }, [])

  const getCourse = async (url, token) => {
    try {
      return (
        await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    document.title = 'Thiết lập về tôi tại F8'
  }, [])
  return loading ? (
    <Loading />
  ) : (
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
              <CourseList courses={myCourse} path={'/courses'} />
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
