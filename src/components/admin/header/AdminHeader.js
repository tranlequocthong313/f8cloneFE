import { Image, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import User from '../../layout/nav/components/User'
import styles from './AdminHeader.module.scss'
import logo from '../../../asset/images/f8_icon.png'
import { useEffect, useState } from 'react'
import MainButton from '../../../utils/button/MainButton'

const AdminHeader = ({ manageMode, setManageMode }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const [titleHeader, setTitleHeader] = useState('Thiết kế bài học')

  useEffect(() => {
    switch (manageMode) {
      case 'add-lesson': {
        setTitleHeader('Thiết kế bài học')
        break
      }
      case 'add-episode': {
        setTitleHeader('Thiết kế chương')
        break
      }
      case 'edit-episode': {
        setTitleHeader('Sửa chương')
        break
      }
      case 'edit-lesson': {
        setTitleHeader('Sửa bài học')
        break
      }
      default:
        return
    }
  }, [manageMode])

  return (
    <Navbar className={styles.navHeader}>
      <div
        onClick={() => navigate(-1)}
        title={'Quay lại'}
        className={styles.backHome}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <Navbar.Brand className={styles.logo}>
        <Link to="/">
          <Image src={logo} className={styles.logoNavbar} />
          <h4>F8 Admin</h4>
        </Link>
        <h5>{titleHeader}</h5>
      </Navbar.Brand>
      <div className={styles.userAction}>
        {manageMode !== 'add-lesson' && (
          <MainButton
            className={styles.designLessonBtn}
            primary={true}
            onClick={() => setManageMode('add-lesson')}
          >
            Thiết kế bài học
          </MainButton>
        )}
        <User
          isAdminPage={true}
          photoURL={user.photoURL}
          displayName={user.displayName}
          email={user.email}
          slug={user.slug}
          className={styles.userWrapper}
        />
      </div>
    </Navbar>
  )
}

export default AdminHeader
