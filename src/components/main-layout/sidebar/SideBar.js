import React, { useContext, memo } from 'react'
import NewBlogButton from './components/NewBlogButton'
import { Navbar, Nav, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './SideBar.module.scss'
import { NavContext } from '../../../context/NavContext'

const SideBar = ({ isBlog }) => {
  const { active, activeHandler } = useContext(NavContext)

  return (
    <Navbar className={styles.wrapper}>
      <Nav
        className={
          isBlog
            ? `${styles.blogSidebar} ${styles.container}}`
            : styles.container
        }
      >
        <NewBlogButton />
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link
              to="/"
              className={active === '' ? styles.active : ''}
              onClick={() => activeHandler('')}
            >
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              to="/learning-path"
              className={active === 'learning-path' ? styles.active : ''}
              onClick={() => activeHandler('learning-path')}
            >
              <i className="fa-solid fa-road"></i>
              <span>Lộ trình</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              to={'/courses' || '/courses/course-slug'}
              className={active === 'courses' ? styles.active : ''}
              onClick={() => activeHandler('courses')}
            >
              <i className="fa-solid fa-lightbulb"></i>
              <span>Học</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              to="/blog"
              className={active === 'blog' ? styles.active : ''}
              onClick={() => activeHandler('blog')}
            >
              <i className="fa-solid fa-newspaper"></i>
              <span>Blog</span>
            </Link>
          </li>
        </ul>
      </Nav>
    </Navbar>
  )
}

export default memo(SideBar)
