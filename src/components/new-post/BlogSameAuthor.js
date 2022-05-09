import React, { useEffect, useState } from 'react'
import styles from './BlogSameAuthor.module.scss'
import { Link } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import consoleLog from '../../utils/console-log/consoleLog'

const BlogSameAuthor = ({ postedBy, blogId }) => {
  const [blogSameAuthor, setBlogSameAuthor] = useState([])

  useEffect(() => {
    ;(async () => {
      const url = `${apiURL}/blog/${blogId}/${postedBy}`
      const data = await getBlogSameAuthor(url)
      if (!data.success) return

      setBlogSameAuthor(data)
    })()
  }, [blogId, postedBy])

  const getBlogSameAuthor = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      consoleLog(error.message)
    }
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Bài đăng cùng tác giả</h3>

      <ul className={styles.list}>
        {blogSameAuthor.length === 0 && (
          <p className={styles.noBlogSameAuthor}>
            Tác giả chưa có bài đăng nào khác.
          </p>
        )}
        {blogSameAuthor.length > 0 &&
          blogSameAuthor.map((blog) => (
            <li key={blog._id}>
              <Link to={`/blog/${blog._id}`}>{blog.titleDisplay}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogSameAuthor
