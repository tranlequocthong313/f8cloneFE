import React, { Suspense, useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './BookmarkPost.module.scss'
import '../../sass/_withSidebarContent.scss'
import '../../sass/_mainHeadingTitle.scss'
import { Row } from 'react-bootstrap'
import Header from '../../components/layout/nav/Header'
import SideBar from '../../components/layout/sidebar/SideBar'
import Cookies from 'js-cookie'
import { apiURL } from '../../context/constants'
import timeSince from '../../components/utils/timeSince/timeSince'
import Tabs from '../../components/utils/tabs/Tabs'
import SubLoading from '../../components/utils/loading/SubLoading'
import consoleLog from '../../components/utils/console-log/consoleLog'

const Footer = React.lazy(() => import('../../components/layout/footer/Footer'))

const BookmarkPost = () => {
  const [bookmarkData, setBookmarkData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => (document.title = 'Bài viết đã lưu tại F8'), [])

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const token = Cookies.get('token')
      if (!token) return

      const url = `${apiURL}/me/bookmark-post`
      const data = await getBookmarkPost(url, token)

      if (data) {
        setBookmarkData(data)
        setLoading(false)
      }
    })()
  }, [])

  const getBookmarkPost = async (url, token) => {
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

  return loading ? (
    <SubLoading />
  ) : (
    <div className={styles.wrapper}>
      <h1 className="mainHeadingTitle">Bài viết đã lưu</h1>
      <div className={styles.tabs}>
        <Tabs
          isActive={true}
          tab={'Bài viết'}
          quantity={`(${bookmarkData.length})`}
          path={'/bookmark-post'}
        />
      </div>
      {bookmarkData.length === 0 && (
        <div className={styles.message}>
          <p>Bạn chưa lưu bài viết nào.</p>
          <p>
            Bấm vào đây để <Link to="/blog">xem các bài viết nổi bật.</Link>
          </p>
        </div>
      )}
      {bookmarkData.length > 0 &&
        bookmarkData.map((bookmark) => (
          <ul key={bookmark._id} className={styles.bookmarkList}>
            <li>
              <h3>
                <a href={`blog/${bookmark.slug}`}>
                  <span>{bookmark.titleDisplay}</span>
                </a>
              </h3>
              <div className={styles.author}>
                <a href={`blog/${bookmark.slug}`}>
                  Đã đăng {timeSince(bookmark.createdAt)}
                </a>
                <span className={styles.dot}>.</span>
                <span>
                  Tác giả <strong>{bookmark.postedBy.fullName}</strong>
                </span>
              </div>
              <span className={styles.option}>
                <i className="fa-solid fa-ellipsis"></i>
              </span>
            </li>
          </ul>
        ))}
    </div>
  )
}

export default BookmarkPost
