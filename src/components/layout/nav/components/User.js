import { Image, Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './User.module.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../actions/userAction'
import Cookies from 'js-cookie'
import Tippy from '../../../utils/tippy/Tippy'

const User = ({ photoURL, displayName, isAdminPage, className, slug }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const dispatchAndNavigate = () => {
    dispatch(logout())
    navigate('/login')
  }

  const singOut = () => {
    Cookies.remove('token')
    dispatchAndNavigate()
  }

  return (
    <Tippy
      button={
        <div className={styles.userTippyButton}>
          <Image
            className={`${styles.userPicture} ${className}`}
            src={photoURL}
          />
          {isAdminPage && <p>{user.displayName}</p>}
        </div>
      }
      className={`${styles.menuWrapper} ${className}`}
    >
      <div className={styles.user}>
        <Image src={photoURL} className={styles.avatar} />
        <div className={styles.info}>
          <div className={styles.name}>{displayName}</div>
          <div className={styles.fullName}>{slug}</div>
        </div>
      </div>
      {user.isAdmin && (
        <Link className={styles.menuItem} to="/admin/course">
          Quản lý F8
        </Link>
      )}
      <Link className={styles.menuItem} to="/new-post">
        Viết blog
      </Link>

      <Link className={styles.menuItem} to="/my-post/published">
        Bài viết của tôi
      </Link>

      <Link className={styles.menuItem} to="/bookmark-post">
        Bài viết đã lưu
      </Link>

      <Link className={`${styles.menuItem} ${styles.divider}`} to="/settings">
        Cài đặt
      </Link>
      <Link className={styles.menuItem} to="/login" onClick={singOut}>
        Đăng xuất
      </Link>
    </Tippy>
  )
}

export default User
