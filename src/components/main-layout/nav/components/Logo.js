import React, { useContext } from 'react'
import { Navbar, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../../asset/images/f8_icon.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Logo.module.scss'
import { NavContext } from '../../../../context/NavContext'

const Logo = () => {
  const { active } = useContext(NavContext)

  const navigate = useNavigate()

  return (
    <Navbar.Brand className={styles.logo}>
      <Link to="/">
        <Image src={logo} className={styles.logoNavbar} />
      </Link>
      {active === 'home' && (
        <h4 className={styles.logoHeading}>Học Lập Trình Để Đi Làm</h4>
      )}
      {active !== 'home' && (
        <div onClick={() => navigate(-1)}>
          <h4 className={styles.logoHeading}>
            <i className="fa-solid fa-chevron-left"></i>
            <span>Quay lại</span>
          </h4>
        </div>
      )}
    </Navbar.Brand>
  )
}

export default Logo
