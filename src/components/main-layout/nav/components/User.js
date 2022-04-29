import { Image, Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './User.module.scss'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../actions/userAction'
import Cookies from 'js-cookie'
import Tippy from '../../../utils/tippy/Tippy'

const User = ({ photoURL, displayName, email, slug }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const dispatchAndHistory = () => {
    dispatch(logout())
    history.push('/login')
  }

  const singOut = () => {
    Cookies.remove('token')
    dispatchAndHistory()
  }

  return (
    <Tippy
      button={<Image className={styles.userPicture} src={photoURL} />}
      className={styles.menuWrapper}
    >
      <div className={styles.user}>
        <Image src={photoURL} className={styles.avatar} />
        <div className={styles.info}>
          <div className={styles.name}>{displayName}</div>
          <div className={styles.fullName}>{slug}</div>
        </div>
      </div>
      {user.isAdmin && (
        <>
          <Dropdown.Item className={styles.menuItem}>
            <Link to="/admin/course">Quản lý F8</Link>
          </Dropdown.Item>
        </>
      )}
      <Dropdown.Item className={styles.menuItem}>
        <Link to="/new-post">Viết blog</Link>
      </Dropdown.Item>
      <Dropdown.Item className={styles.menuItem}>
        <Link to="/my-post/published">Bài viết của tôi</Link>
      </Dropdown.Item>
      <Dropdown.Item className={styles.menuItem}>
        <Link to="/bookmark-post">Bài viết đã lưu</Link>
      </Dropdown.Item>
      <Dropdown.Item className={styles.menuItem}>
        <Link to="/settings">Cài đặt</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item className={styles.menuItem}>
        <Link to="/login" onClick={singOut}>
          Đăng xuất
        </Link>
      </Dropdown.Item>
    </Tippy>
  )
}

export default User
