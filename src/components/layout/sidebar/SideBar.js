import { useContext, memo } from 'react'
import NewBlogButton from './components/NewBlogButton'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './SideBar.module.scss'
import { NavContext } from '../../../context/NavContext'

const SideBar = () => {
  const { activeTab, setActiveTab } = useContext(NavContext)

  return (
    <Navbar className={styles.wrapper}>
      <Nav className={styles.container}>
        <NewBlogButton />
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link
              to="/"
              className={activeTab === 'home' ? styles.active : ''}
              onClick={() => setActiveTab('home')}
            >
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              to="/learning-path"
              className={activeTab === 'learning-path' ? styles.active : ''}
              onClick={() => setActiveTab('learning-path')}
            >
              <i className="fa-solid fa-road"></i>
              <span>Lộ trình</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              to={'/courses' || '/courses/course-slug'}
              className={activeTab === 'courses' ? styles.active : ''}
              onClick={() => setActiveTab('courses')}
            >
              <i className="fa-solid fa-lightbulb"></i>
              <span>Học</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              to="/blog"
              className={activeTab === 'blog' ? styles.active : ''}
              onClick={() => setActiveTab('blog')}
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
