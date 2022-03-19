import React, { useState } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './NewBlog.module.scss'

const NewBlog = () => {
  const [show, setShow] = useState(false)
  const showHandler = () => {
    setShow(prev => !prev)
  }

  return (
    <NavDropdown
      onClick={showHandler}
      title={
        <i
          className={`${show ? styles.active : styles.newBlogIcon} bi bi-plus`}
        ></i>
      }
      id="basic-nav-dropdown"
      className={styles.newBlog}
    >
      <ul className={styles.list}>
        <li>
          <Link to="/new-blog" className={styles.link}>
            <i className="bi bi-pencil-fill"></i>
            <span>Viết blog</span>
          </Link>
        </li>
      </ul>
    </NavDropdown>
  )
}

export default NewBlog
