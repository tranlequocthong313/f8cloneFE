import React, { Suspense, useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import styles from './Admin.module.scss'
import CreateVideo from '../../components/home/videos/CreateVideo'
import Tabs from '../../components/utils/tabs/Tabs'
import AdminCourse from '../../components/admin/AdminCourse'
import AdminBlog from '../../components/admin/AdminBlog'
import AdminVideo from '../../components/admin/AdminVideo'
import { apiURL } from '../../context/constants'
import MainButton from '../../components/utils/button/MainButton'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer'),
)

const Admin = () => {
  const location = useLocation()
  const user = useSelector((state) => state.user)

  const [tabs, setTabs] = useState(location.pathname)
  const [courseData, setCourseData] = useState([])
  const [blogData, setBlogData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [addVideo, setAddVideo] = useState(false)

  useEffect(() => {
    document.title = 'Quản lý F8'
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}/admin`, {
          signal: controller.signal,
        })
        const data = await res.json()

        console.log(data)

        setCourseData(data.course)
        setBlogData(data.blogs)
        setVideoData(data.videos)
      } catch (error) {
        console.log(error.message)
      }
    })()

    return () => controller?.abort()
  }, [user.videoCreated, user.blogCreated])

  return (
    <>
      <Header />
      <div className={styles.sidebarWrap}>
        <SideBar isHide={true} />
      </div>
      <Container fluid className={styles.wrapper}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <h2>Quản lý F8</h2>
            <div className={styles.tabs}>
              <Tabs
                path={'/admin/course'}
                tab={'Khóa học'}
                onActive={() => setTabs('/admin/course')}
                isActive={tabs === '/admin/course'}
                quantity={`(${courseData.length})`}
              />
              <Tabs
                path={'/admin/blog'}
                tab={'Bài viết'}
                onActive={() => setTabs('/admin/blog')}
                isActive={tabs === '/admin/blog'}
                quantity={`(${blogData.length})`}
              />
              <Tabs
                path={'/admin/video'}
                tab={'Video'}
                onActive={() => setTabs('/admin/video')}
                isActive={tabs === '/admin/video'}
                quantity={`(${videoData.length})`}
              />
            </div>
            {tabs === '/admin/course' && (
              <div className={styles.container}>
                <MainButton outline={true}>Thêm khóa học</MainButton>
                <AdminCourse courseData={courseData} />
              </div>
            )}
            {tabs === '/admin/blog' && <AdminBlog blogData={blogData} />}
            {tabs === '/admin/video' && (
              <div className={styles.container}>
                <CreateVideo />
                <AdminVideo videoData={videoData} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Admin
