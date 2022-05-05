import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import styles from './Admin.module.scss'
import CreateVideo from '../../components/home/videos/CreateVideo'
import Tabs from '../../components/utils/tabs/Tabs'
import AdminCourse from '../../components/admin/AdminCourse'
import AdminBlog from '../../components/admin/AdminBlog'
import AdminVideo from '../../components/admin/AdminVideo'
import { apiURL } from '../../context/constants'
import MainButton from '../../components/utils/button/MainButton'
import SubLoading from '../../components/utils/loading/SubLoading'
import consoleLog from '../../components/utils/console-log/consoleLog'

const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const Admin = () => {
  const location = useLocation()

  const [tabs, setTabs] = useState(location.pathname)
  const [courseData, setCourseData] = useState([])
  const [blogData, setBlogData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => (document.title = 'Quản lý F8'), [])

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}/admin`
      const data = await getDataForAdmin(url)

      if (data) {
        setCourseData(data.course)
        setBlogData(data.blogs)
        setVideoData(data.videos)
        setLoading(false)
      }
    })()
  }, [])

  const getDataForAdmin = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return loading ? (
    <SubLoading />
  ) : (
    <Container fluid className={styles.wrapper}>
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
            <Link to={'/admin/create-course'}>
              <MainButton primary={true} className={styles.button}>
                <i className="fa-solid fa-plus"></i> Tạo khóa học
              </MainButton>
            </Link>
            <AdminCourse
              courseData={courseData}
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
    </Container>
  )
}

export default Admin
