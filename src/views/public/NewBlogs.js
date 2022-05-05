import { useState, useEffect } from 'react'
import SecondaryCard from '../../components/utils/card/SecondaryCard'
import { Image } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import styles from './NewBlogs.module.scss'
import { apiURL } from '../../context/constants'
import timeSince from '../../components/utils/timeSince/timeSince'
import Cookies from 'js-cookie'
import consoleLog from '../../components/utils/console-log/consoleLog'

const NewBlogs = ({ blogs }) => {
  const location = useLocation()

  const [bookmarkData, setBookmarkData] = useState(null)

  useEffect(() => {
    ;(async () => {
      const token = Cookies.get('token')
      if (!token) return

      const url = `${apiURL}/me/bookmark`
      const data = await getBookmark(url, token)

      setBookmarkData(data.bookmark)
    })()
  }, [])

  const getBookmark = async (url, token) => {
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

  const bookmark = async (blogId) => {
    const token = Cookies.get('token')
    if (!token) return location('/login')

    const url = `${apiURL}/me/bookmark`
    const data = await patchBookmark(url, blogId, token)

    setBookmarkData(data.bookmark)
  }

  const patchBookmark = async (url, blogId, token) => {
    try {
      return (
        await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ blogId }),
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

  return (
    <>
      {blogs.map((blog) => (
        <SecondaryCard key={blog._id}>
          <div className={styles.header}>
            <div className={styles.author}>
              <Link to={`/blog/${blog._id}`}>
                <Image src={blog.postedBy.photoURL} />
              </Link>
              <Link to={`/blog/${blog._id}`}>
                <span>{blog.postedBy.fullName}</span>
              </Link>
            </div>
            <div className={styles.action} onClick={() => bookmark(blog._id)}>
              <i
                className={
                  bookmarkData && bookmarkData.includes(blog._id)
                    ? `${styles.bookmarkActive} fa-solid fa-bookmark`
                    : 'fa-regular fa-bookmark'
                }
              ></i>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.content}>
              <Link to={`/blog/${blog._id}`}>
                <h3>{blog.titleDisplay}</h3>
                <p>{blog.description ? blog.description : blog.content}</p>
              </Link>
              <div className={styles.info}>
                <span>{timeSince(blog.createdAt)}</span>
                <span className={styles.dot}>.</span>
                {blog.readingTime} phút đọc
              </div>
            </div>
            {blog.image && (
              <div className={styles.image}>
                <Link to={`/blog/${blog._id}`}>
                  <Image src={blog.image} />
                </Link>
              </div>
            )}
          </div>
        </SecondaryCard>
      ))}
    </>
  )
}

export default NewBlogs
