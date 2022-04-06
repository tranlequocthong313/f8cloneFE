import React, { useState, useEffect, Suspense } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './Blog.module.scss'
import '../../sass/_withSidebarContent.scss'
import NewBlogs from '../../components/blog/NewBlogs'
import Topics from '../../components/blog/Topics'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { apiURL } from '../../context/constants'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer'),
)

const Blog = () => {
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    document.title =
      'Danh sách bài viết về lĩnh vực IT / CNTT / Phần mềm / lập trình tại F8'
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}/blog`, {
          signal: controller.signal,
        })
        const data = await res.json()

        setBlogs(data)
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
            <Row className={styles.wrapper}>
              <div className={styles.containerTop}>
                <h2>Bài viết nổi bật</h2>
                <p>
                  Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình
                  online và các kỹ thuật lập trình web.
                </p>
              </div>
              {blogs && (
                <Col xs={12} lg={8} xl={8} className={styles.leftLayout}>
                  <NewBlogs blogs={blogs} />
                </Col>
              )}
              <Col xs={12} lg={4} xl={4} className={styles.rightLayout}>
                <Topics />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Blog
