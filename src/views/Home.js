import React, { useState, useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './Home.module.scss'
import Slide from '../components/homepage/slide/Slide'
import BlogList from '../components/homepage/blogs/BlogList'
import VideoList from '../components/homepage/videos/VideoList'
import HeadingTitleWrap from '../components/utils/title-heading/HeadingTitleWrap'
import CourseList from '../components/homepage/courses/CourseList'
import '../sass/_withSidebarContent.scss'
import Tabs from '../components/homepage/tabs/Tabs'
import Header from '../components/main-layout/nav/Header'
import SideBar from '../components/main-layout/sidebar/SideBar'
import Footer from '../components/main-layout/footer/Footer'

const Home = () => {
  const [tabActive, setTabActive] = useState('front-end')

  const tabActiveHandler = tab => setTabActive(tab)

  const [courseData, setCourseData] = useState([])
  const [blogData, setBlogData] = useState([])
  const [videoData, setVideoData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('https://f8clone.herokuapp.com/')
      const data = await res.json()

      setCourseData(data.COURSES_DUMMY_DATA)
      setBlogData(data.BLOGS_DUMMY_DATA)
      setVideoData(data.VIDEOS_DUMMY_DATA)
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
            <Slide />
            <div className={styles.wrapper}>
              <p className={styles.subHeading}>
                <strong>167.739+</strong> người khác đã học
              </p>
              <HeadingTitleWrap
                title={'Lộ trình học'}
                label={'Mới'}
                viewMode={'Xem chi tiết'}
              />
              <Tabs
                activeHandler={tabActiveHandler}
                tabActiveState={tabActive}
              />
              <CourseList courses={courseData} />
              <HeadingTitleWrap
                title={'Bài viết nổi bật'}
                viewMode={'Xem tất cả'}
              />
              <BlogList blogs={blogData} />
              <HeadingTitleWrap
                title={'Videos nổi bật'}
                viewMode={'Xem tất cả'}
              />
              <VideoList videos={videoData} />
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default Home
