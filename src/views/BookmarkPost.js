import React, { Suspense } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './BookmarkPost.module.scss'
import '../sass/_withSidebarContent.scss'
import '../sass/_mainHeadingTitle.scss'
import { Row } from 'react-bootstrap'
import Header from '../components/main-layout/nav/Header'
import SideBar from '../components/main-layout/sidebar/SideBar'

const BookmarkPost = () => {
  const Footer = React.lazy(() =>
    import('../components/main-layout/footer/Footer')
  )

  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <div className={styles.wrapper}>
              <h1 className="mainHeadingTitle">Bài viết đã lưu</h1>
              <div className={styles.tabs}>
                <div className={styles.tab}>Bài viết (0)</div>
              </div>
              <div className={styles.message}>
                <p>Bạn chưa lưu bài viết nào.</p>
                <p>
                  Bấm vào đây để{' '}
                  <Link to="/blog">xem các bài viết nổi bật.</Link>
                </p>
              </div>
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

export default BookmarkPost
