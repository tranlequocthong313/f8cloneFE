import { useContext } from 'react'
import { Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import styles from './MobileNav.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import userDefaultImage from '../../../../asset/images/nobody_m.256x256.jpg'
import { logout } from '../../../../actions/userAction'
import { NavContext } from '../../../../context/NavContext'
import Cookies from 'js-cookie'
import VerticalModal from '../../../utils/vertical-modal/VerticalModal'

const MobileNav = ({ photoURL }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { active, activeHandler } = useContext(NavContext)
  const user = useSelector((state) => state.user)

  // Dispatch logout action and navigate user to login page after logout
  const dispatchAndNavigateHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  const singOutHandler = () => {
    Cookies.remove('token')
    dispatchAndNavigateHandler()
  }

  return (
    <VerticalModal
      button={<i className={`bi bi-list ${styles.icon}`}></i>}
      className={styles.mobileNav}
      hideOnComputer={true}
    >
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
                <i className="fa-solid fa-right-to-bracket"></i>
                Đăng nhập
              </Link>
            </li>
          </ul>
        )}
        <ul className={styles.list}>
          <li
            onClick={() => {
              activeHandler('my-course')
            }}
            className={active === 'my-course' ? styles.active : styles.item}
          >
            <Link to="/my-course">
              <i className="fa-solid fa-book-open"></i>
              <span>Khóa học của tôi</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li
            onClick={() => {
              activeHandler('')
            }}
            className={active === '' ? styles.active : styles.item}
          >
            <Link to="/">
              <i className="fa-solid fa-house"></i>
              <span>Trang chủ</span>
            </Link>
          </li>
          <li
            onClick={() => {
              activeHandler('learning-path')
            }}
            className={active === 'learning-path' ? styles.active : styles.item}
          >
            <Link to="/learning-path">
              <i className="fa-solid fa-road"></i>
              <span>Lộ trình</span>
            </Link>
          </li>
          <li
            onClick={() => {
              activeHandler('courses')
            }}
            className={active === 'courses' ? styles.active : styles.item}
          >
            <Link to={'/courses' || '/course-slug'}>
              <i className="fa-solid fa-lightbulb"></i>
              <span>Khóa học</span>
            </Link>
          </li>
          <li
            onClick={() => {
              activeHandler('blog')
            }}
            className={active === 'blog' ? styles.active : styles.item}
          >
            <Link to="/blog">
              <i className="fa-solid fa-newspaper"></i>
              <span>Blog</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li
            onClick={() => {
              activeHandler('me')
            }}
            className={active === 'me' ? styles.active : styles.item}
          >
            <Link to="/bookmark-post">
              <i className="fa-solid fa-bookmark"></i>
              <span>Bài viết đã lưu</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li
            onClick={() => {
              activeHandler('about-us')
            }}
            className={active === 'about-us' ? styles.active : styles.item}
          >
            <Link to="/about-us">
              <i className="fa-solid fa-circle-info"></i>
              <span>Giới thiệu</span>
            </Link>
          </li>
          <li
            onClick={() => {
              activeHandler('careers')
            }}
            className={active === 'careers' ? styles.active : styles.item}
          >
            <Link to="/careers">
              <i className="fa-solid fa-users"></i>
              <span>Cơ hội việc làm</span>
            </Link>
          </li>
        </ul>
        {user.isLoggedIn && (
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/login" onClick={singOutHandler}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Đăng xuất</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </VerticalModal>
  )
}

export default MobileNav
