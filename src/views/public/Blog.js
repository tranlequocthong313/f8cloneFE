import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './Blog.module.scss'
import '../../sass/_withSidebarContent.scss'
import NewBlogs from '../public/NewBlogs'
import { apiURL } from '../../context/constants'
import { Link } from 'react-router-dom'
import SubLoading from '../../components/utils/loading/SubLoading'
import consoleLog from '../../components/utils/console-log/consoleLog'

const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const Blog = () => {
  const [blogs, setBlogs] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      (document.title =
        'Danh sách bài viết về lĩnh vực IT / CNTT / Phần mềm / lập trình tại F8'),
    []
  )

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const url = `${apiURL}/blog`
      const data = await getBlog(url)

      if (data) {
        setBlogs(data)
        setLoading(false)
      }
    })()
  }, [])

  const getBlog = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return loading ? (
    <SubLoading />
  ) : (
    <Row className={styles.wrapper}>
      <div className={styles.containerTop}>
        <h2>Bài viết nổi bật</h2>
        <p>
          Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online
          và các kỹ thuật lập trình web.
        </p>
      </div>
      <Col xs={12} lg={8} xl={8} className={styles.leftLayout}>
        {blogs && blogs.length !== 0 && <NewBlogs blogs={blogs} />}
        {(!blogs || blogs.length === 0) && (
          <p>
            Không có bài viết nào <Link to="/new-post">thêm bài viết.</Link>
          </p>
        )}
      </Col>
    </Row>
  )
}

export default Blog
