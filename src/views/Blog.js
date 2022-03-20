import React, { useState, useEffect } from 'react'
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
import { apiURL } from '../context/constants'

const Blog = () => {
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch(`${apiURL}`)
      const data = await res.json()

      setBlogs(data.BLOGS_DUMMY_DATA)
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
                <h1>Bài viết nổi bật</h1>
                <p>
                  Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình
                  online và các kỹ thuật lập trình web.
                </p>
              </div>
              <Container fluid style={{ padding: 0 }}>
                <Row style={{ marginTop: 0 }} className={styles.layout}>
                  {blogs && (
                    <Col xs={12} lg={8} xl={8} className={styles.leftLayout}>
                      <NewBlogs blogs={blogs} />
                    </Col>
                  )}
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
