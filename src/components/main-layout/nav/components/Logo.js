import React, { useContext } from 'react'
import { Navbar, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../../../asset/images/f8_icon.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Logo.module.scss'
import { NavContext } from '../../../../context/NavContext'

const Logo = () => {
  const { active, activeHandler } = useContext(NavContext)

  return (
    <Navbar.Brand className={styles.logo}>
      <Link to="/">
        <Image src={logo} className={styles.logoNavbar} />
      </Link>
      {active === '' && (
        <h4 className={styles.logoHeading}>Học Lập Trình Để Đi Làm</h4>
      )}

      {active !== '' && (
        <Link
          to="/"
          className={styles.backHome}
          onClick={() => activeHandler('')}
        >
          <h4 className={styles.logoHeading}>
            <i className="fa-solid fa-chevron-left"></i>
            <span>Quay lại</span>
          </h4>
        </Link>
      )}
    </Navbar.Brand>
  )
}

export default Logo
