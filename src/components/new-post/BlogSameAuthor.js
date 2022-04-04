import React from 'react'
import styles from './BlogSameAuthor.module.scss'
import { Link } from 'react-router-dom'

const BlogSameAuthor = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Bài đăng cùng tác giả</h3>
      <ul className={styles.list}>
        <li>
          <Link to="/">[Cơ bản]Object trong Javascript</Link>
        </li>
        <li>
          <Link to="/">[Cơ bản]Object trong Javascript</Link>
        </li>
        <li>
          <Link to="/">[Cơ bản]Object trong Javascript</Link>
        </li>
        <li>
          <Link to="/">[Cơ bản]Object trong Javascript</Link>
        </li>
        <li>
          <Link to="/">[Cơ bản]Object trong Javascript</Link>
        </li>
      </ul>
    </div>
  )
}

export default BlogSameAuthor
