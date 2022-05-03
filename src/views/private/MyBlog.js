import React, { Suspense, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import '../../sass/_withSidebarContent.scss'
import '../../sass/_container.scss'
import styles from './MyBlog.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'
import timeSince from '../../components/utils/timeSince/timeSince'
import Tabs from '../../components/utils/tabs/Tabs'
import Tippy from '../../components/utils/tippy/Tippy'
import Loading from '../../components/utils/loading/Loading'
import consoleLog from '../../components/utils/console-log/consoleLog'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const MyBlog = () => {
  const location = useLocation()

  const [tabs, setTabs] = useState(location.pathname)
  const [myBlog, setMyBlog] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => (document.title = 'Bài viết của tôi tại F8'), [])

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const token = Cookies.get('token')
      if (!token) return

      const url = `${apiURL}/help/my-post`
      const data = await getMyPost(url, token)

      if (data) {
        setMyBlog(data)
        setLoading(false)
      }
    })()
  }, [])

  const getMyPost = async (url, token) => {
    try {
      return (
        await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  const deleteBlogById = async (id) => {
    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/blog/delete-blog/${id}`
    const data = await deleteBlog(url, token)

    setMyBlog(data)
  }

  const deleteBlog = async (url, token) => {
    try {
      return (
        await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11} style={{ padding: '8px' }}>
          <div className="withSidebarContent">
            <div className="container" style={{ marginBottom: 100 }}>
              <div className="containerTop">
                <h2>Bài viết của tôi</h2>
              </div>
              <Container fluid style={{ padding: 0 }}>
                <Row style={{ marginTop: 0 }}>
                  <Col xs={12} md={12} xl={8}>
                    <div className={styles.tabs}>
                      <Tabs
                        path={'/my-post/published'}
                        tab={'Đã xuất bản'}
                        quantity={`(${myBlog.length})`}
                        onActive={() => setTabs('/my-post/published')}
                        isActive={tabs === '/my-post/published'}
                      />
                    </div>
                    {tabs === '/my-post/published' && myBlog.length === 0 && (
                      <div className={styles.message}>
                        <p>Chưa có xuất bản nào.</p>
                        <p>
                          Bấm vào đây để{' '}
                          <Link to="/blog">xem các bài viết nổi bật.</Link>
                        </p>
                      </div>
                    )}
                    {tabs === '/my-post/published' &&
                      myBlog.length > 0 &&
                      myBlog.map((blog) => (
                        <ul key={blog._id} className={styles.blogList}>
                          <li>
                            <div className={styles.heading}>
                              <h3>
                                <Link to={`/new-post/${blog._id}`}>
                                  <span>{blog.title}</span>
                                </Link>
                              </h3>
                              <Tippy
                                button={
                                  <span className={styles.option}>
                                    <i className={`fa-solid fa-ellipsis`}></i>
                                  </span>
                                }
                                className={styles.optionWrapper}
                              >
                                <Link
                                  to={`/edit-post/${blog._id}`}
                                  className={styles.optionItem}
                                >
                                  Chỉnh sửa
                                </Link>
                                <div
                                  onClick={() => deleteBlogById(blog._id)}
                                  className={styles.optionItem}
                                >
                                  Xóa
                                </div>
                              </Tippy>
                            </div>
                            <div className={styles.author}>
                              <a href={`/blog/${blog._id}`}>
                                Chỉnh sửa {timeSince(blog.createdAt)}
                              </a>
                              <span className={styles.dot}>.</span>
                              <span>{blog.readingTime} phút đọc</span>
                            </div>
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
