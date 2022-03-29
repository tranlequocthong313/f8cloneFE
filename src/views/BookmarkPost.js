import React, { Suspense, useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './BookmarkPost.module.scss'
import '../sass/_withSidebarContent.scss'
import '../sass/_mainHeadingTitle.scss'
import { Row } from 'react-bootstrap'
import Header from '../components/main-layout/nav/Header'
import SideBar from '../components/main-layout/sidebar/SideBar'
import Cookies from 'js-cookie'
import { apiURL } from '../context/constants'
import timeSinceHandler from '../components/utils/timeSinceHandler/timeSinceHandler'
import SecondaryCard from '../components/utils/card/SecondaryCard'

const Footer = React.lazy(() =>
  import('../components/main-layout/footer/Footer')
)

const BookmarkPost = () => {
  const [bookmarkData, setBookmarkData] = useState(null)

  useEffect(() => {
    const getUserHandler = async () => {
      const token = Cookies.get('token')

      try {
        if (!token) return

        const res = await fetch(`${apiURL}/me/bookmark-post`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        console.log(data)

        setBookmarkData(data)
      } catch (error) {
        console.log(error)
      }
    }

    getUserHandler()
  }, [])

  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <div className="withSidebarContent">
            <div className={styles.wrapper}>
              <h1 className="mainHeadingTitle">Bài viết đã lưu</h1>
              <div className={styles.tabs}>
                <div className={styles.tab}>
                  Bài viết {bookmarkData ? `(${bookmarkData.length})` : '(0)'}
                </div>
              </div>
              {bookmarkData && bookmarkData.length === 0 && (
                <div className={styles.message}>
                  <p>Bạn chưa lưu bài viết nào.</p>
                  <p>
                    Bấm vào đây để{' '}
                    <Link to="/blog">xem các bài viết nổi bật.</Link>
                  </p>
                </div>
              )}
              {bookmarkData &&
                bookmarkData.map(bookmark => (
                  <ul key={bookmark._id} className={styles.bookmarkList}>
                    <li>
                      <h3>
                        <a href={`blog/${bookmark.slug}`}>
                          <span>{bookmark.titleDisplay}</span>
                        </a>
                      </h3>
                      <div className={styles.author}>
                        <a href={`blog/${bookmark.slug}`}>
                          Đã đăng {timeSinceHandler(bookmark.createdAt)}
                        </a>
                        <span className={styles.dot}>.</span>
                        <span>
                          Tác giả <strong>{bookmark.postedBy.fullName}</strong>
                        </span>
                      </div>
                      <span className={styles.option}>
                        <i className="bi bi-three-dots"></i>
                      </span>
                    </li>
                  </ul>
                ))}
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
