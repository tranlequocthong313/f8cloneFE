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
  import('../../components/main-layout/footer/Footer')
)

const Admin = () => {
  const location = useLocation()
  const blog = useSelector((state) => state.blog)
  const video = useSelector((state) => state.video)
  const course = useSelector((state) => state.course)

  const [tabs, setTabs] = useState(location.pathname)
  const [courseData, setCourseData] = useState([])
  const [blogData, setBlogData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => (document.title = 'Quản lý F8'), [])

  useEffect(() => {
    ;(async () => {
      const url = `${apiURL}/admin`
      const data = await getDataForAdmin(url)

      setCourseData(data.course)
      setBlogData(data.blogs)
      setVideoData(data.videos)
    })()
  }, [])

  const getDataForAdmin = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      console.log(error.message)
    }
  }

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
              <>
                <div className={styles.buttonGroup}>
                  <MainButton
                    outline={true}
                    onClick={() => setShowAddModal(true)}
                    className={styles.button}
                  >
                    <i className="fa-solid fa-plus"></i> Tạo khóa học
                  </MainButton>
                </div>
                <AdminCourse
                  courseData={courseData}
                  showAddModal={showAddModal}
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  setShowAddModal={setShowAddModal}
                  setCourseData={setCourseData}
                />
              </>
            )}
            {tabs === '/admin/blog' && (
              <AdminBlog blogData={blogData} setBlogData={setBlogData} />
            )}
            {tabs === '/admin/video' && (
              <div className={styles.container}>
                <CreateVideo setVideoData={setVideoData} />
                <AdminVideo videoData={videoData} setVideoData={setVideoData} />
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
