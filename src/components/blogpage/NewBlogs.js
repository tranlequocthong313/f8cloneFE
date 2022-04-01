import React, { useState, useEffect } from 'react'
import SecondaryCard from '../utils/card/SecondaryCard'
import { Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import styles from './NewBlogs.module.scss'
import { apiURL } from '../../context/constants'
import noPhotoUser from '../../asset/nobody_m.256x256.jpg'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

const NewBlogs = ({ blogs }) => {
  const navigate = useNavigate()

  const [bookmarkData, setBookmarkData] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const token = Cookies.get('token')

        if (!token) return

        const res = await fetch(
          `${apiURL}/me/bookmark`,
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
        setBookmarkData(data.bookmark)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => controller?.abort()
  }, [])

  const bookmarkHandler = async blogId => {
    try {
      const token = Cookies.get('token')

      if (!token) {
        return navigate('/login')
      }

      const res = await fetch(`${apiURL}/me/bookmark`, {
        method: 'PUT',
        body: JSON.stringify({ blogId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      console.log('bookmark', data)

      setBookmarkData(data.bookmark)
    } catch (error) {}
  }

  return (
    <>
      {blogs.map(blog => (
        <SecondaryCard key={blog._id}>
          <div className={styles.header}>
            <div className={styles.author}>
              <Link to={`${blog.slug}`}>
                <Image
                  src={
                    blog.postedBy.photoURL
                      ? blog.postedBy.photoURL
                      : noPhotoUser
                  }
                />
              </Link>
              <Link to={`${blog.slug}`}>
                <span>{blog.postedBy.fullName}</span>
              </Link>
            </div>
            <div
              className={styles.action}
              onClick={() => bookmarkHandler(blog._id)}
            >
              <i
                className={
                  bookmarkData && bookmarkData.includes(blog._id)
                    ? `${styles.bookmarkActive} bi bi-bookmark-fill`
                    : 'bi bi-bookmark'
                }
              ></i>
              <i className="bi bi-three-dots"></i>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.content}>
              <Link to={`${blog.slug}`}>
                <h3>{blog.titleDisplay}</h3>
                <p>{blog.description ? blog.description : blog.content}</p>
              </Link>
              <div className={styles.info}>
                <span>{timeSinceHandler(blog.createdAt)}</span>
                <span className={styles.dot}>.</span>
                {blog.readingTime} phút đọc
              </div>
            </div>
            {blog.image && (
              <div className={styles.image}>
                <Link to={`${blog.slug}`}>
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
