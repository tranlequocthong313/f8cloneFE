import React, { useState, useEffect, Suspense } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './Home.module.scss'
import Slide from '../components/homepage/slide/Slide'
import HeadingTitleWrap from '../components/utils/title-heading/HeadingTitleWrap'
import CourseList from '../components/homepage/courses/CourseList'
import '../sass/_withSidebarContent.scss'
import Header from '../components/main-layout/nav/Header'
import SideBar from '../components/main-layout/sidebar/SideBar'
import { apiURL } from '../context/constants'
import { useSelector } from 'react-redux'

const BlogList = React.lazy(() =>
  import('../components/homepage/blogs/BlogList')
)
const VideoList = React.lazy(() =>
  import('../components/homepage/videos/VideoList')
)
const Footer = React.lazy(() =>
  import('../components/main-layout/footer/Footer')
)

const Home = () => {
  const user = useSelector(state => state.user)

  const [courseFE, setCourseFE] = useState([])
  const [courseBE, setCourseBE] = useState([])
  const [blogData, setBlogData] = useState([])
  const [videoData, setVideoData] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}`, {
          signal: controller.signal,
        })
        const data = await res.json()

        setCourseFE(data.courseFE)
        setCourseBE(data.courseBE)
        setBlogData(data.blogs)
        setVideoData(data.videos)
      } catch (error) {
        console.log(error.message)
      }
    })()

    return () => controller?.abort()
  }, [user.videoCreated])

  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <Slide />
            <div className={styles.wrapper}>
              <HeadingTitleWrap
                title={'Lộ trình học Front-end'}
                label={'Mới'}
                viewMode={'Xem chi tiết'}
              />
              <CourseList courses={courseFE} />
              <HeadingTitleWrap
                title={'Lộ trình học Back-end'}
                label={'Mới'}
                viewMode={'Xem chi tiết'}
              />
              <CourseList courses={courseBE} />

              <Suspense fallback={<div></div>}>
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
              </Suspense>
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

export default Home
