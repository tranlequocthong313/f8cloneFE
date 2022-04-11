import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'
import styles from './BlogHighlights.module.scss'

const BlogHighlights = ({ blogHighlight }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Bài viết nổi bật khác</h3>
      {blogHighlight && blogHighlight.length === 0 && (
        <p className={styles.noBlogSameAuthor}>
          Không có bài viết nổi bật nào.
        </p>
      )}
      {blogHighlight &&
        blogHighlight.length > 0 &&
        blogHighlight.map((blog) => (
          <div className={styles.post} key={blog._id}>
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
        ))}
    </div>
  )
}

export default BlogHighlights
