import React from 'react'
import SecondaryCard from '../utils/card/SecondaryCard'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './NewBlogs.module.scss'
import { apiURL } from '../../context/constants'
import noPhotoUser from '../../asset/nobody_m.256x256.jpg'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'

const NewBlogs = ({ blogs }) => {
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
              <i className="bi bi-bookmark"></i>
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
