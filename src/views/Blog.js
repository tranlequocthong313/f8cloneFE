import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './Blog.module.scss'
import '../sass/_withSidebarContent.scss'
import '../sass/_container.scss'
import userDefaultImage from '../asset/nobody_m.256x256.jpg'
import NewBlogs from '../components/blogpage/NewBlogs'
import Topics from '../components/blogpage/Topics'
import Header from '../components/main-layout/nav/Header'
import SideBar from '../components/main-layout/sidebar/SideBar'
import Footer from '../components/main-layout/footer/Footer'

const BLOGS_DUMMY_DATA = [
  {
    id: Math.random(),
    image: userDefaultImage,
    title: 'Sản phẩm react sau 2 tuần chăm chỉ học tại f8',
    description:
      'Mình là một học viên đang sinh sống và làm việc tại Nhật Bản , Vốn là dân trái ngành muốn quay đầu học lại IT để có thể tìm kiếm...',
    author: '陈武',
    createdFromNow: '4 ngày trước',
    readingTime: 5,
  },
  {
    id: Math.random(),
    image: userDefaultImage,
    title: 'Sản phẩm react sau 2 tuần chăm chỉ học tại f8',
    description:
      'Mình là một học viên đang sinh sống và làm việc tại Nhật Bản , Vốn là dân trái ngành muốn quay đầu học lại IT để có thể tìm kiếm...',
    author: '陈武',
    createdFromNow: '4 ngày trước',
    readingTime: 5,
  },
  {
    id: Math.random(),
    image: userDefaultImage,
    title: 'Sản phẩm react sau 2 tuần chăm chỉ học tại f8',
    description:
      'Mình là một học viên đang sinh sống và làm việc tại Nhật Bản , Vốn là dân trái ngành muốn quay đầu học lại IT để có thể tìm kiếm...',
    author: '陈武',
    createdFromNow: '4 ngày trước',
    readingTime: 5,
  },
  {
    id: Math.random(),
    image: userDefaultImage,
    title: 'Sản phẩm react sau 2 tuần chăm chỉ học tại f8',
    description:
      'Mình là một học viên đang sinh sống và làm việc tại Nhật Bản , Vốn là dân trái ngành muốn quay đầu học lại IT để có thể tìm kiếm...',
    author: '陈武',
    createdFromNow: '4 ngày trước',
    readingTime: 5,
  },
  {
    id: Math.random(),
    image: userDefaultImage,
    title: 'Sản phẩm react sau 2 tuần chăm chỉ học tại f8',
    description:
      'Mình là một học viên đang sinh sống và làm việc tại Nhật Bản , Vốn là dân trái ngành muốn quay đầu học lại IT để có thể tìm kiếm...',
    author: '陈武',
    createdFromNow: '4 ngày trước',
    readingTime: 5,
  },
  {
    id: Math.random(),
    image: userDefaultImage,
    title: 'Sản phẩm react sau 2 tuần chăm chỉ học tại f8',
    description:
      'Mình là một học viên đang sinh sống và làm việc tại Nhật Bản , Vốn là dân trái ngành muốn quay đầu học lại IT để có thể tìm kiếm...',
    author: '陈武',
    createdFromNow: '4 ngày trước',
    readingTime: 5,
  },
  {
    id: Math.random(),
    image: userDefaultImage,
    title: 'Sản phẩm react sau 2 tuần chăm chỉ học tại f8',
    description:
      'Mình là một học viên đang sinh sống và làm việc tại Nhật Bản , Vốn là dân trái ngành muốn quay đầu học lại IT để có thể tìm kiếm...',
    author: '陈武',
    createdFromNow: '4 ngày trước',
    readingTime: 5,
  },
  {
    id: Math.random(),
    image: userDefaultImage,
    title: 'Sản phẩm react sau 2 tuần chăm chỉ học tại f8',
    description:
      'Mình là một học viên đang sinh sống và làm việc tại Nhật Bản , Vốn là dân trái ngành muốn quay đầu học lại IT để có thể tìm kiếm...',
    author: '陈武',
    createdFromNow: '4 ngày trước',
    readingTime: 5,
  },
]

const Blog = () => {
  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <div className="container">
              <div className="containerTop">
                <h1>Bài viết nổi bật</h1>
                <p>
                  Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình
                  online và các kỹ thuật lập trình web.
                </p>
              </div>
              <Container fluid style={{ padding: 0 }}>
                <Row style={{ marginTop: 0 }} className={styles.layout}>
                  <Col xs={12} lg={8} xl={8} className={styles.leftLayout}>
                    <NewBlogs newBlogs={BLOGS_DUMMY_DATA} />
                  </Col>
                  <Col xs={12} lg={4} xl={4} className={styles.rightLayout}>
                    <Topics />
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default Blog
