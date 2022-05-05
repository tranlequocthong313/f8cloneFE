import React from 'react'
import { Container, Image, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import User from '../../layout/nav/components/User'
import styles from './AdminHeader.module.scss'
import logo from '../../../asset/images/f8_icon.png'

const AdminHeader = () => {
  const user = useSelector((state) => state.user)

  return (
    <Navbar className={styles.navHeader}>
      <Container fluid style={{ padding: 0 }}>
        <Navbar.Brand className={styles.logo}>
          <Link to="/">
            <Image src={logo} className={styles.logoNavbar} />
            <h4>F8 Admin</h4>
          </Link>
          <h5>Thiết kế bài học</h5>
        </Navbar.Brand>
        <div className={styles.userAction}>
          <User
            isAdminPage={true}
            photoURL={user.photoURL}
            displayName={user.displayName}
            email={user.email}
            slug={user.slug}
            className={styles.userWrapper}
          />
        </div>
      </Container>
    </Navbar>
  )
}

export default AdminHeader
