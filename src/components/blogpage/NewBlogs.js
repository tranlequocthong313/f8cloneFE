import React from 'react'
import SecondaryCard from '../utils/card/SecondaryCard'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './NewBlogs.module.scss'

const NewBlogs = ({ newBlogs }) => {
  return (
    <>
      {newBlogs.map(newBlog => (
        <SecondaryCard key={newBlog.id}>
          <div className={styles.header}>
            <div className={styles.author}>
              <Link to="/">
                <Image src={newBlog.image} />
              </Link>
              <Link to="/">
                <span>{newBlog.author}</span>
              </Link>
            </div>
            <div className={styles.action}>
              <i className="bi bi-bookmark"></i>
              <i className="bi bi-three-dots"></i>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.content}>
              <Link to="/">
                <h3>{newBlog.title}</h3>
                <p>{newBlog.description}</p>
              </Link>
              <div className={styles.info}>
                <span>{newBlog.createdFromNow}</span>
                <span className={styles.dot}>.</span>
                {newBlog.readingTime} phút đọc
              </div>
            </div>
          </div>
        </SecondaryCard>
      ))}
    </>
  )
}

export default NewBlogs
