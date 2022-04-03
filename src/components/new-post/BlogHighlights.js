import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'
import styles from './BlogHighlights.module.scss'

const BlogHighlights = ({ blog }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Bài viết nổi bật khác</h3>
      <div className={styles.post}>
        <div className={styles.author}>
          Đăng bởi <strong>{blog.postedBy.fullName}</strong>
          <span className={styles.dot}>.</span>
          <span className={styles.createdAt}>
            {timeSinceHandler(blog.createdAt)}
          </span>
        </div>
        <Link to={`/blog/${blog.slug}`}>
          <h3 className={styles.title}>{blog.titleDisplay}</h3>
        </Link>
        <Link to={`/blog/${blog.slug}`}>
          <Image src={blog.image} className={styles.thumb} />
        </Link>
        <p>{blog.description ? blog.description : blog.content}</p>
      </div>
    </div>
  )
}

export default BlogHighlights
