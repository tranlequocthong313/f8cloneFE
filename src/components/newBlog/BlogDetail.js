import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Row, Col, Image } from 'react-bootstrap'
import styles from './BlogDetail.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import BlogSameAuthor from './BlogSameAuthor'
import BlogHighlights from './BlogHighlights'
import Topics from '../blogpage/Topics'
import noPhotoUser from '../../asset/nobody_m.256x256.jpg'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'
import { apiURL } from '../../context/constants'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import Reaction from './Reaction'

const BlogDetail = ({ blog }) => {
  const userId = useSelector(state => state.user.userId)

  const [likeCount, setLikeCount] = useState(blog.likes)
  const [isLike, setIsLike] = useState(blog.likes.includes(userId))

  useEffect(() => {
    setIsLike(likeCount.includes(userId))
  }, [userId, likeCount])

  const likeHandler = async blogId => {
    try {
      const token = Cookies.get('token')
      if (!token) return

      const res = await fetch(`${apiURL}/blog/like`, {
        method: 'PUT',
        body: JSON.stringify({ blogId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (data.likes.length === 0) {
        setLikeCount([])
      } else {
        setLikeCount(data.likes)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const commentHandler = () => {}

  return (
    <Row className={styles.wrapper}>
      <Col xl={2} className={styles.colLeft}>
        <div className={styles.aside}>
          <h4 className={styles.fullName}>{blog.postedBy.fullName}</h4>
          <p className={styles.userTitle}></p>
          <hr />
          <Reaction
            blogId={blog._id}
            isLike={isLike}
            likeCount={likeCount.length}
            likeHandler={likeHandler}
            commentHandler={commentHandler}
          />
        </div>
      </Col>
      <Col md={12} lg={12} xl={6} className={styles.colRight}>
        <h1 className={styles.heading}>{blog.title}</h1>
        <div className={styles.header}>
          <div className={styles.user}>
            <Image
              src={
                blog.postedBy.photoURL ? blog.postedBy.photoURL : noPhotoUser
              }
              className={styles.avatar}
            />
            <div className={styles.info}>
              <p className={styles.name}>{blog.postedBy.fullName}</p>
              <p className={styles.time}>
                {timeSinceHandler(blog.createdAt)}{' '}
                <span className={styles.dot}>.</span>
                {blog.readingTime} phút đọc
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.bookmark}>
              <i className="bi bi-bookmark"></i>
            </div>
            <div className={styles.option}>
              <i className="bi bi-three-dots"></i>
            </div>
          </div>
        </div>
        <ReactMarkdown children={blog.content} />
        <Reaction
          blogId={blog._id}
          isLike={isLike}
          likeCount={likeCount.length}
          likeHandler={likeHandler}
          commentHandler={commentHandler}
        />
        {blog.tags && (
          <div className={styles.tags}>
            {blog.tags.map(tag => (
              <Link to="/" key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        )}
        <BlogSameAuthor />
        <BlogHighlights />
        <Topics />
      </Col>
    </Row>
  )
}

export default BlogDetail
