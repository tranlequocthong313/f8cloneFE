import { useState, useEffect, useContext } from 'react'
import { Offcanvas, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import styles from './MobileNav.module.scss'
import '../../../../sass/_offCanvas.scss'
import { useDispatch, useSelector } from 'react-redux'
import userDefaultImage from '../../../../asset/nobody_m.256x256.jpg'
import { logout } from '../../../../actions/userAction'
import { NavContext } from '../../../../context/NavContext'
import Cookies from 'js-cookie'

const MobileNav = ({ photoURL }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { active, activeHandler } = useContext(NavContext)
  const user = useSelector(state => state.user)

  const [show, setShow] = useState(false)

  // Dispatch logout action and navigate user to login page after logout
  const dispatchAndNavigateHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  // Listen window resize to hide mobile nav on computer
  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth >= 1024) return setShow(false)
    }
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  const handleShow = () => setShow(prev => !prev)

  const singOutHandler = () => {
    Cookies.remove('token')
    dispatchAndNavigateHandler()
  }

  return (
    <section className={styles.mobileNav}>
      <div onClick={handleShow} className={styles.item}>
        <i className="bi bi-list"></i>
      </div>

      <Offcanvas show={show} onHide={handleShow} className={styles.item}>
        {user.isLoggedIn && (
          <div className={styles.user}>
            <Image
              className={styles.userPicture}
              src={photoURL || userDefaultImage}
            />
          </div>
        )}
        <div className={styles.listWrap}>
          {!user.isLoggedIn && (
            <ul className={styles.list}>
              <li>
                <Link to="/login">
                  <i className="bi bi-box-arrow-in-right"></i>Đăng nhập
                </Link>
              </li>
            </ul>
          )}
          <ul className={styles.list}>
            <li
              onClick={() => {
                handleShow()
                activeHandler('my-course')
              }}
              className={active === 'my-course' ? styles.active : styles.item}
            >
              <Link to="/my-course">
                <i className="bi bi-book-fill"></i>
                <span>Khóa học của tôi</span>
              </Link>
            </li>
          </ul>
          <ul className={styles.list}>
            <li
              onClick={() => {
                handleShow()
                activeHandler('')
              }}
              className={active === '' ? styles.active : styles.item}
            >
              <Link to="/">
                <i className="bi bi-house-door-fill"></i>
                <span>Trang chủ</span>
              </Link>
            </li>
            <li
              onClick={() => {
                handleShow()
                activeHandler('learning-path')
              }}
              className={
                active === 'learning-path' ? styles.active : styles.item
              }
            >
              <Link to="/learning-path">
                <i className="bi bi-bar-chart-fill"></i>
                <span>Lộ trình</span>
              </Link>
            </li>
            <li
              onClick={() => {
                handleShow()
                activeHandler('courses')
              }}
              className={active === 'courses' ? styles.active : styles.item}
            >
              <Link to={'/courses' || '/course-slug'}>
                <i className="bi bi-lightbulb-fill"></i>
                <span>Khóa học</span>
              </Link>
            </li>
            <li
              onClick={() => {
                handleShow()
                activeHandler('blog')
              }}
              className={active === 'blog' ? styles.active : styles.item}
            >
              <Link to="/blog">
                <i className="bi bi-book-fill"></i>
                <span>Blog</span>
              </Link>
            </li>
          </ul>
          <ul className={styles.list}>
            <li
              onClick={() => {
                handleShow()
                activeHandler('me')
              }}
              className={active === 'me' ? styles.active : styles.item}
            >
              <Link to="/bookmark-post">
                <i className="bi bi-bookmark-fill"></i>
                <span>Bài viết đã lưu</span>
              </Link>
            </li>
          </ul>
          <ul className={styles.list}>
            <li
              onClick={() => {
                handleShow()
                activeHandler('about-us')
              }}
              className={active === 'about-us' ? styles.active : styles.item}
            >
              <Link to="/about-us">
                <i className="bi bi-info-circle-fill"></i>
                <span>Giới thiệu</span>
              </Link>
            </li>
            <li
              onClick={() => {
                handleShow()
                activeHandler('careers')
              }}
              className={active === 'careers' ? styles.active : styles.item}
            >
              <Link to="/careers">
                <i className="bi bi-people-fill"></i>
                <span>Cơ hội việc làm</span>
              </Link>
            </li>
          </ul>
          {user.isLoggedIn && (
            <ul className={styles.list}>
              <li onClick={handleShow} className={styles.item}>
                <Link to="/login" onClick={singOutHandler}>
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span>Đăng xuất</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </Offcanvas>
    </section>
  )
}

export default MobileNav
