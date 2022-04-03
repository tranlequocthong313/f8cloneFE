import React, { Suspense, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import '../../sass/_withSidebarContent.scss'
import '../../sass/_container.scss'
import styles from './MyBlog.module.scss'
import { Link } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'
import timeSinceHandler from '../../components/utils/timeSinceHandler/timeSinceHandler'
import Tabs from '../../components/utils/tabs/Tabs'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const MyBlog = () => {
  const [tabs, setTabs] = useState('draft')
  const [myBlog, setMyBlog] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const token = Cookies.get('token')
        if (!token) return

        const res = await fetch(
          `${apiURL}/blog/my-post`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
          {
            signal: controller.signal,
          }
        )

        const data = await res.json()
        console.log(data)
        setMyBlog(data.myBlog)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => controller?.abort()
  }, [])

  return (
    <>
      <Header />
      <Row>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
          <SideBar />
        </Col>
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <div className="container">
              <div className="containerTop">
                <h1>Bài viết của tôi</h1>
              </div>
              <Container fluid style={{ padding: 0 }}>
                <Row style={{ marginTop: 0 }}>
                  <Col xs={12} md={12} xl={8}>
                    <div className={styles.tabs}>
                      {/* <Tabs tab={'Bản nháp'} quantity={bookmarkData && `(${bookmarkData.length})`}/> */}
                      <Tabs
                        tab={'Đã xuất bản'}
                        quantity={myBlog && `(${myBlog.length})`}
                        onActive={() => setTabs('published')}
                        isActive={tabs === 'published'}
                      />
                    </div>
                    {myBlog && myBlog.length === 0 && (
                      <div className={styles.message}>
                        <p>Bạn chưa lưu bài viết nào.</p>
                        <p>
                          Bấm vào đây để{' '}
                          <Link to="/blog">xem các bài viết nổi bật.</Link>
                        </p>
                      </div>
                    )}
                    {tabs === 'published' &&
                      myBlog &&
                      myBlog.map(blog => (
                        <ul key={blog._id} className={styles.blogList}>
                          <li>
                            <h3>
                              <a href={`blog/${blog.slug}`}>
                                <span>{blog.titleDisplay}</span>
                              </a>
                            </h3>
                            <div className={styles.author}>
                              <a href={`blog/${blog.slug}`}>
                                Chỉnh sửa {timeSinceHandler(blog.createdAt)}
                              </a>
                              <span className={styles.dot}>.</span>
                              <span>{blog.readingTime} phút đọc</span>
                            </div>
                            <span className={styles.option}>
                              <i className="fa-solid fa-ellipsis"></i>
                            </span>
                          </li>
                        </ul>
                      ))}
                  </Col>
                </Row>
              </Container>
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

export default MyBlog
