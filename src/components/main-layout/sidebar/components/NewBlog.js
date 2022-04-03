import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './NewBlog.module.scss'

const NewBlog = () => {
  return (
    <NavDropdown
      title={<i className={`${styles.newBlogIcon} fa-regular fa-plus`}></i>}
      id="basic-nav-dropdown"
      className={styles.newBlog}
    >
      <ul className={styles.list}>
        <li>
          <Link to="/new-blog" className={styles.link}>
            <i className="fa-solid fa-pen"></i>
            <span>Viết blog</span>
          </Link>
        </li>
      </ul>
    </NavDropdown>
  )
}

export default NewBlog
