import React, { useState, useEffect } from 'react'
import SecondaryCard from '../utils/card/SecondaryCard'
import { Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import styles from './NewBlogs.module.scss'
import { apiURL } from '../../context/constants'
import noPhotoUser from '../../asset/nobody_m.256x256.jpg'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'
import Cookies from 'js-cookie'

const NewBlogs = ({ blogs }) => {
  const navigate = useNavigate()

  const [isBookmark, setIsBookmark] = useState(false)

  const [bookmarkData, setBookmarkData] = useState([])

  useEffect(() => {
    const blogId = blogs.map(blog => blog._id)
    const bookmarkBlogId = bookmarkData.map(bookmark => bookmark._id)

    console.log(blogId)
    console.log(bookmarkBlogId)
    setIsBookmark(blogId[0] === bookmarkBlogId[0])
  }, [bookmarkData, blogs])

  const bookmarkHandler = async blogId => {
    try {
      const token = Cookies.get('token')

      if (!token) {
        return navigate('/login')
      }

      const res = await fetch(`${apiURL}/me/bookmark-post`, {
        method: 'PUT',
        body: JSON.stringify({ blogId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

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
            <div className={styles.action}>
              <i
                className={
                  !isBookmark
                    ? 'bi bi-bookmark'
                    : `${styles.bookmarkActive} bi bi-bookmark-fill`
                }
                onClick={() => bookmarkHandler(blog._id)}
              ></i>
              <i className="bi bi-three-dots"></i>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.content}>
              <Link to={`${blog.slug}`}>
                <h3>{blog.titleDisplay ? blog.titleDisplay : blog.title}</h3>
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
                  <Image src={`${apiURL}/${blog.image}`} />
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
