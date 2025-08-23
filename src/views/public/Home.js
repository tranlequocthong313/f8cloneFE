import React, { useState, useEffect, Suspense } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './Home.module.scss'
import Slide from '../../components/home/slide/Slide'
import HeadingTitleWrap from '../../components/utils/title-heading/HeadingTitleWrap'
import CourseList from '../../components/home/courses/CourseList'
import '../../sass/_withSidebarContent.scss'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { apiURL } from '../../context/constants'
import { useSelector } from 'react-redux'
import MainCardAdd from '../../components/utils/card/MainCardAdd'
import { Link } from 'react-router-dom'
import MainToast from '../../components/utils/toast/MainToast'

const BlogList = React.lazy(() =>
  import('../../components/home/blogs/BlogList'),
)
const VideoList = React.lazy(() =>
  import('../../components/home/videos/VideoList'),
)
const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer'),
)

const Home = () => {
  const user = useSelector((state) => state.user)

  const [courseFE, setCourseFE] = useState([])
  const [courseBE, setCourseBE] = useState([])
  const [blogData, setBlogData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [fetchStatus, setFetchStatus] = useState({
    show: true,
  })

  useEffect(() => {
    document.title =
      'F8 - học lập trình để đi làm! | Học lập trình online | Học lập trình Javascript'
  }, [])

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
        setFetchStatus({
          show: false
        })
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
                {blogData && blogData.length !== 0 ? (
                  <BlogList blogs={blogData} />
                ) : (
                  <p>
                    Không có bài viết nào{' '}
                    <Link to="/new-post">thêm bài viết.</Link>
                  </p>
                )}
                <HeadingTitleWrap
                  title={'Videos nổi bật'}
                  viewMode={'Xem tất cả'}
                />
                {videoData && videoData.length !== 0 ? (
                  <VideoList videos={videoData} />
                ) : (
                  <p>
                    Không có video nào{' '}
                    {user.isAdmin && <Link to="/admin/video">thêm video.</Link>}
                  </p>
                )}
              </Suspense>
            </div>
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
      <MainToast status={fetchStatus} failText={`This app is running on a free backend server. It may take up to 50 seconds or more to wake up if idle. If the server is still waking up, please wait and then reload the website after ~50s. Thanks for your patience!`} />
    </>
  )
}

export default Home
