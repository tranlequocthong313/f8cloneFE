import React from 'react'
import { Navbar, Image } from 'react-bootstrap'
import styles from './LearningHeader.module.scss'
import { Link } from 'react-router-dom'
import logo from '../../asset/f8_icon.png'
import CircularProgressBar from '../utils/circular-progress-bar/CircularProgressBar'

const LearningHeader = () => {
  return (
    <Navbar className={styles.navHeader}>
      <Link
        to="/"
        className={styles.backHome}
        //   onClick={() => activeHandler('')}
      >
        <i className="bi bi-chevron-left"></i>
      </Link>
      <Navbar.Brand className={styles.logo}>
        <Link to="/">
          <Image src={logo} className={styles.logoNavbar} />
        </Link>
        <h4 className={styles.logoHeading}>Học Lập Trình Để Đi Làm</h4>
      </Navbar.Brand>
      <div className={styles.userAction}>
        <div className={styles.progressBar}>
          <CircularProgressBar
            numberPercent={'20%'}
            className={styles.circularProgress}
          />
          <p>
            <strong>2/10</strong> bài học
          </p>
        </div>
        <button className={styles.actionButton}>
          <i className="bi bi-file-earmark-fill"></i> <span>Ghi chú</span>
        </button>
        <button className={styles.actionButton}>
          <i className="bi bi-question-circle-fill"></i> <span>Hướng dẫn</span>
        </button>
      </div>
    </Navbar>
  )
}

export default LearningHeader
