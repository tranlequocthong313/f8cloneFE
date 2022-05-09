import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import { timeSince } from '../../utils/format/index'
import styles from './BlogHighlights.module.scss'
import f8Logo from '../../asset/images/f8_icon.png'

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
              Đăng bởi{' '}
              <Link to={`/${blog.postedBy.slug}`}>
                <strong>{blog.postedBy.fullName}</strong>
              </Link>
              <span className={styles.dot}>.</span>
              <span className={styles.createdAt}>
                {timeSince(blog.createdAt)}
              </span>
            </div>
            <Link to={`/blog/${blog._id}`}>
              <h3 className={styles.title}>{blog.titleDisplay}</h3>
            </Link>
            <Link to={`/blog/${blog._id}`}>
              <Image
                src={blog.image ? blog.image : f8Logo}
                className={styles.thumb}
              />
            </Link>
            <p>{blog.description ? blog.description : blog.content}</p>
          </div>
        ))}
    </div>
  )
}

export default BlogHighlights
