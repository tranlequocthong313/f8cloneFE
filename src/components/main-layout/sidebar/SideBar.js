import React, { useContext, memo } from 'react'
import NewBlog from './components/NewBlog'
import { Navbar, Nav, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './SideBar.module.scss'
import { NavContext } from '../../../context/NavContext'

const SideBar = ({ isBlog }) => {
  const { active, activeHandler } = useContext(NavContext)

  return (
    <Col xs={0} sm={0} md={1} lg={1} xl={1}>
      <Navbar className={styles.wrapper}>
        <Nav
          className={
            isBlog
              ? `${styles.blogSidebar} ${styles.container}}`
              : styles.container
          }
        >
          <NewBlog />
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link
                to="/"
                className={active === '' ? styles.active : ''}
                onClick={() => activeHandler('')}
              >
                <i className="bi bi-house-door-fill"></i>
                <span>Home</span>
              </Link>
            </li>
            <li className={styles.item}>
              <Link
                to="/learning-path"
                className={active === 'learning-path' ? styles.active : ''}
                onClick={() => activeHandler('learning-path')}
              >
                <i className="bi bi-bar-chart-fill"></i>
                <span>Lộ trình</span>
              </Link>
            </li>
            <li className={styles.item}>
              <Link
                to={'/courses' || '/courses/course-slug'}
                className={active === 'courses' ? styles.active : ''}
                onClick={() => activeHandler('courses')}
              >
                <i className="bi bi-lightbulb-fill"></i>
                <span>Học</span>
              </Link>
            </li>
            <li className={styles.item}>
              <Link
                to="/blog"
                className={active === 'blog' ? styles.active : ''}
                onClick={() => activeHandler('blog')}
              >
                <i className="bi bi-book-fill"></i>
                <span>Blog</span>
              </Link>
            </li>
          </ul>
        </Nav>
      </Navbar>
    </Col>
  )
}

export default memo(SideBar)
