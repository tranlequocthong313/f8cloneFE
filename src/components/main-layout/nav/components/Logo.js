import React, { useContext } from 'react'
import { Navbar, Image } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../../../asset/images/f8_icon.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Logo.module.scss'
import { NavContext } from '../../../../context/NavContext'

const Logo = () => {
  const { activeTab } = useContext(NavContext)

  const history = useHistory()

  return (
    <Navbar.Brand className={styles.logo}>
      <Link to="/">
        <Image src={logo} className={styles.logoNavbar} />
      </Link>
      {activeTab === 'home' && (
        <h4 className={styles.logoHeading}>Học Lập Trình Để Đi Làm</h4>
      )}
      {activeTab !== 'home' && (
        <div onClick={history.goBack}>
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
