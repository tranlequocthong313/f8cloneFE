import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Image } from 'react-bootstrap'
import styles from './NotFound.module.scss'
import logo from '../../asset/images/f8_icon.png'

const NotFound = () => {
  // Set window title
  useEffect(() => {
    document.title = 'Trang này không tồn tại'
  }, [])

  return (
    <>
      <Navbar className={`${styles.navHeader} p-0`}>
        <Container fluid style={{ padding: 20 }}>
          <Navbar.Brand className={styles.logo}>
            <Link to="/">
              <Image src={logo} className={styles.logoNavbar} />
            </Link>

            <h4 className={styles.logoHeading}>Học Lập Trình Để Đi Làm</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className={styles.content}>
        <h2 className={styles.errorCode}> </h2>
        <h1 className={styles.errorCodeTitle}>Không tìm thấy nội dung 😓</h1>
        <ul className={styles.suggestionMessage}>
          <li>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</li>
          <li>
            Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì
            dùng URL đã lưu.
          </li>
        </ul>
        <Link to="/">Quay về trang chủ</Link>
        <p>
          👉 hoặc đi tới <Link to="/my-course">khóa học của tôi</Link>
        </p>
      </div>

      <div className={styles.copyRight}>
        © 2022 F8 - Nền tảng học lập trình web đầu tiên tại Việt Nam
      </div>
    </>
  )
}

export default NotFound
