import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import MainCard from '../../utils/card/MainCard'
import styles from './BlogItem.module.scss'
import CardButton from '../../utils/card/CardButton'

const BlogItem = props => {
  const { blog } = props

  return (
    <MainCard>
      <Link to="/blog">
        <section
          title={blog.title}
          style={{ backgroundImage: `url(${blog.image})` }}
        >
          <CardButton>Xem bài viết</CardButton>
        </section>
      </Link>
      <h3 className={styles.title}>
        <Link to="/">{blog.title}</Link>
      </h3>
      <div className={styles.author}>
        <Link to="/">
          <Image src={blog.authorPicture} />
        </Link>
        <Link to="/">
          <strong>{blog.author}</strong>
          <span>{blog.readingTime} phút đọc</span>
        </Link>
      </div>
    </MainCard>
  )
}

export default BlogItem
