import { useState, useEffect } from 'react'
import { Image, Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './User.module.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import userDefaultImage from '../../../../asset/images/nobody_m.256x256.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../actions/userAction'
import Cookies from 'js-cookie'
import removeActions from '../../../utils/remove-accents/removeActions'
import Tippy from '../../../utils/tippy/Tippy'

const User = ({ photoURL, displayName, email, currentPage }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const [show, setShow] = useState(false)

  const showHandler = () => setShow((prev) => !prev)

  // Dispatch logout action and navigate user to login page after logout
  const dispatchAndNavigateHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  const singOutHandler = () => {
    Cookies.remove('token')
    dispatchAndNavigateHandler()
  }

  // Listen window resize to hide mobile nav on computer
  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth >= 1024) return setShow(false)
    }
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return (
    <Tippy
      button={
        <Image
          className={styles.userPicture}
          src={photoURL || userDefaultImage}
          onClick={showHandler}
        />
      }
      className={styles.menuWrapper}
    >
      <div className={styles.user}>
        <Image src={photoURL || userDefaultImage} className={styles.avatar} />
        <div className={styles.info}>
          <div className={styles.name}>{displayName}</div>
          <div className={styles.fullName}>
            {displayName &&
              `@${removeActions(displayName.toLowerCase().replace(/\s/g, ''))}`}
          </div>
        </div>
      </div>
      {user.isAdmin && (
        <>
          <Dropdown.Divider />
          <Link className={styles.menuItem} to="/admin/course">
            Quản lý F8
          </Link>
        </>
      )}
      <Dropdown.Divider />
      <Link className={styles.menuItem} to="/new-blog">
        Viết blog
      </Link>
      <Link className={styles.menuItem} to="/my-post/drafts">
        Bài viết của tôi
      </Link>
      <Dropdown.Divider />
      <Link className={styles.menuItem} to="/bookmark-post">
        Bài viết đã lưu
      </Link>
      <Dropdown.Divider />
      <Link className={styles.menuItem} to="/settings">
        Cài đặt
      </Link>
      <Link className={styles.menuItem} to="/login" onClick={singOutHandler}>
        Đăng xuất
      </Link>
    </Tippy>
  )
}

export default User
