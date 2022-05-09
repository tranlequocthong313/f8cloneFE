import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../../sass/_withSidebarContent.scss'
import '../../sass/_container.scss'
import styles from './MyBlog.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'
import { timeSince } from '../../utils/format/index'
import Tabs from '../../utils/tabs/Tabs'
import Tippy from '../../utils/tippy/Tippy'
import SubLoading from '../../utils/loading/SubLoading'
import consoleLog from '../../utils/console-log/consoleLog'
import { ModalContext } from '../../context/ModalContext'
import ModalConfirm from '../../utils/modal/ModalConfirm'

const MyBlog = () => {
  const location = useLocation()
  const { onShowConfirm, onHideConfirm } = useContext(ModalContext)

  const [tabs, setTabs] = useState(location.pathname)
  const [myBlog, setMyBlog] = useState([])
  const [loading, setLoading] = useState(true)
  const [blogId, setBlogId] = useState('')

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

  const deleteBlogById = async () => {
    onHideConfirm()

    const token = Cookies.get('token')
    if (!token) return

    const url = `${apiURL}/blog/delete-blog/${blogId}`
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
    <SubLoading />
  ) : (
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
                        <Link to={`/blog/${blog._id}`}>
                          <span>{blog.title}</span>
                        </Link>
                      </h3>
                      <Tippy
                        button={
                          <span className={styles.optionBtn}>
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
                          onClick={() => {
                            onShowConfirm()
                            setBlogId(blog._id)
                          }}
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
      <ModalConfirm
        body={'Bạn có muốn xóa bài viết của bạn?'}
        header={'Xóa bài viết'}
        onConfirm={deleteBlogById}
      />
    </div>
  )
}

export default MyBlog
