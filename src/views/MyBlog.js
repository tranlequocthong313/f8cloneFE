import React, { Suspense, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../components/main-layout/nav/Header'
import SideBar from '../components/main-layout/sidebar/SideBar'
import Tabs from '../components/utils/tabs/Tabs'
import '../sass/_withSidebarContent.scss'
import '../sass/_container.scss'
import styles from './MyBlog.module.scss'
import { apiURL } from '../context/constants'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const tabs = [
  {
    title: 'Bản nháp',
    slug: 'drafts',
  },
  {
    title: 'Đã xuất bản',
    slug: 'published',
  },
]

const MyBlog = () => {
  const Footer = React.lazy(() =>
    import('../components/main-layout/footer/Footer')
  )

  const [myBlog, setMyBlog] = useState(null)

  useEffect(() => {
    getMyBlogHandler()
  }, [])

  const getMyBlogHandler = async () => {
    try {
      const token = Cookies.get('token')

      if (!token) return

      const res = await fetch(`${apiURL}/blog/my-post`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      console.log(
        '🚀 ~ file: MyBlog.js ~ line 39 ~ getMyBlogHandler ~ data',
        data
      )
      // setMyBlog(data.myBlog)
    } catch (error) {
      console.log(error)
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
                <h1>Bài viết của tôi</h1>
              </div>
              <Container fluid style={{ padding: 0 }}>
                <Row style={{ marginTop: 0 }}>
                  <Col xs={12} md={12} xl={8}>
                    <Tabs tabs={tabs} />
                    {/* {myBlog.map(blog => (
                      <SecondaryCard>
                        <div className={styles.wrapper}>
                          <h3 title={blog.title}>
                            <Link to={''}>{blog.title}</Link>
                          </h3>
                          <div className={styles.author}>
                            <Link to={''}>
                              Chỉnh sửa {timeSinceHandler(blog.createdAt)}
                            </Link>
                            <div className={styles.dot}>.</div>
                            <span>{blog.readingTime}</span>
                          </div>
                          <div className={styles.more}>
                            <i className="bi bi-three-dots"></i>
                          </div>
                        </div>
                      </SecondaryCard>
                    ))} */}
                    {!myBlog && (
                      <div className={styles.noMyBlog}>
                        <p>Chưa có xuất bản nào</p>
                        <p>
                          Bạn có thể <Link to="/new-post">viết bài mới</Link>{' '}
                          hoặc <Link to="/blog">đọc bài viết </Link>khác trên F8
                          nhé.
                        </p>
                      </div>
                    )}
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
